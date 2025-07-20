import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  const secretKey = process.env.JWT_SECRET || 'SUPER_SECRET_KEY_DEV';

  jwt.verify(token, secretKey, (err, decodedPayload) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
    req.user = decodedPayload;
    next();
  });
};