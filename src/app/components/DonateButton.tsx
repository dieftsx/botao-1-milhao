"use client";

import { useState } from "react";

export default function DonateButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
      });
      const data = await response.json();

      //Redirecionar para página do Pix - Mostrar QrCode
      window.open(`pix://${data.qr_code}`, "_blank");
    } catch (error) {
      console.error("Erro na doação:", error);
    } finally {
    }
  };

  return (
    <div className="text-center">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-2xl transition-all"
        onClick={handleDonate}
        disabled={isLoading}
      >
        {isLoading ? "Processando..." : "DOAR R$ 1.00"}
      </button>
    </div>
  );
}
