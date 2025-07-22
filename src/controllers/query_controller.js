import { PrismaClient } from '../../generated/prisma/client.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prisma = new PrismaClient();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createQueryWithAI = async (req, res) => {
  const { question, datasetId } = req.body;
  const userId = req.user.userId;

  if (!question || !datasetId) {
    return res.status(400).json({ message: 'A pergunta e o ID do dataset são obrigatórios.' });
  }

  try {
    const records = await prisma.records.findMany({
      where: {
        dataset_id: datasetId,
      },
    });

    if (records.length === 0) {
      return res.status(404).json({ message: 'Nenhum registro encontrado para esse dataset. Impossível responder à pergunta.' });
    }

    const dataContext = JSON.stringify(records.map(r => r.json_data));

    const prompt = `
      Baseado no seguinte contexto:
      ${dataContext}

      Responsda a pergunta do usuário:
      "${question}"

      Regras:
      - Baseie a resposta através do contexto passado
      - Responda de forma direta
      - Caso a pergunta não faça sentido com o contexto responda com "A pergunta realizada não há vínculo com a estrutura especificada"
      - Caso não encontre uma resposta baseada no contexto responda com "A informação não foi encontrada no dataset"
      - Não utilize nenhum conhecimento externo além do contexto fornecido
    `;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiAnswer = response.text();

    const savedQuery = await prisma.queries.create({
      data: {
        question: question,
        answer: aiAnswer.replaceAll('\n', ''),
        user_id: userId,
      }
    });

    res.status(201).json(savedQuery);

  } catch (error) {
    console.error('Erro ao processar a query:', error);
    res.status(500).json({ message: 'Erro ao conectar com o serviço de IA ou processar a requisição.' });
  }
};

export const getQueriesByUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const queries = await prisma.queries.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });

    if (queries.length === 0) {
      return res.status(404).json({ message: 'Nenhuma query encontrada.' });
    }

    res.json(queries);
  } catch (error) {
    console.error('Erro ao buscar queries:', error);
    res.status(500).json({ message: 'Erro ao buscar queries.' });
  }
}