import { PrismaClient } from '../../generated/prisma/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE = 'P2002';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        passwd_hash: hashedPassword,
      },
    });

    const { passwd_hash: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    if (error.code === PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE) {
      return res.status(409).json({ message: 'Este email já está em uso.', error: '' });
    }
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwd_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const secretKey = process.env.JWT_SECRET || 'SUPER_SECRET_KEY_DEV';

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login bem-sucedido!', token });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};