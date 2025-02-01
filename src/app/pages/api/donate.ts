import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      //Gerar payload do PIX - placeholder
      const transactionId = generateTransactionId();

      //Salvar no banco
      const donation = await prisma.donation.create({
        data: {
          transactionId,
          status: "pending",
        },
      });
      //Integração com PIX - mercado pago ou pagseguro
      const pixPayload = await generatePixPayment(transactionId);

      res.status(200).json({
        qr_code: pixPayload.qr_code,
        transaction_id: transactionId,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao processar Doação" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}

function generateTransactionId() {
  return `DONATION-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
// Implementar com a API PIX real
async function generatePixPayment(transactionId: string) {
  return {
    qr_code:
      "00020126360014BR.GOV.BCB.PIX0114+556699999999952040000530398654051.005802BR5925Fulano de Tal6008BRASILIA62070503***6304E7A0",
    expiration: 3600,
  };
}
