import { PrismaClient } from '../../generated/prisma/client.js';

const prisma = new PrismaClient();

export const getMe = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(user);

  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar dados do usuário.' });
  }
};