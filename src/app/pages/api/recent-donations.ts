import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const donations = await prisma.donation.findMany({
      where: { status: "completed" },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        amount: true,
        payer: true,
        createdAt: true,
      },
    });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar doações" });
  }
}
