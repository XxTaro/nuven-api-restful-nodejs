import { PrismaClient } from '../../generated/prisma/client.js';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

export const uploadDataset = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado ou formato inválido.' });
  }

  const userId = req.user.userId;

  try {
    const dataset = await prisma.datasets.create({
      data: {
        name: req.file.originalname,
        user_id: userId,
      }
    });

    if (req.file.mimetype === 'text/csv') {
      const records = [];
      const filePath = req.file.path;

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          records.push({
            json_data: row, 
            dataset_id: dataset.id
          });
        })
        .on('end', async () => {
          await prisma.records.createMany({
            data: records,
          });
          
          console.log('Arquivo CSV processado com sucesso.');
          fs.unlinkSync(filePath);
          
          res.status(201).json({ 
            message: 'Dataset enviado e registros consumidos com sucesso!', 
            dataset 
          });
        });
    } else if (req.file.mimetype === 'application/pdf') {
        res.status(201).json({
            message: 'Arquivo PDF enviado com sucesso!',
            dataset
        });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor.', error: error.message });
  }
};

export const getDatasetById = async (req, res) => {
  const datasetId = req.params.id;

  try {
    const dataset = await prisma.datasets.findUnique({
      where: { id: datasetId },
      include: {
        records: true,
      }
    });

    if (!dataset) {
      return res.status(404).json({ message: 'Dataset não encontrado.' });
    }

    res.json(dataset);
  } catch (error) {
    console.error('Erro ao buscar dataset:', error);
    res.status(500).json({ message: 'Erro ao buscar dataset.' });
  }
};

export const getAllDatasets = async (req, res) => {
    const userId = req.user.userId;
    
    try {
        const datasets = await prisma.datasets.findMany({
        where: { user_id: userId },
        include: {
            records: true,
        }
        });
    
        res.json(datasets);
    } catch (error) {
        console.error('Erro ao buscar datasets:', error);
        res.status(500).json({ message: 'Erro ao buscar datasets.' });
    }
};
