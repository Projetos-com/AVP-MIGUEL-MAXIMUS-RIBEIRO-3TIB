import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const [prefix, token] = parts;

  if (prefix !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }

  if (!decoded || typeof decoded !== "object" || !Number.isInteger(decoded.id)) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const usuario = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!usuario) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    req.user = usuario;
    return next();
  } catch (error) {
    console.error("Erro ao validar usuário autenticado:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    return next();
  };
}
