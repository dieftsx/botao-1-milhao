import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.donation.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: "completed",
    },
  });

  res.status(200).json({ total: result._sum.amout || 0 });
}
