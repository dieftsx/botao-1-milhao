"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [pixDialogOpen, setPixDialogOpen] = useState(false);
  const [totalPixels, setTotalPixels] = useState(0);
  const [pixels, setPixels] = useState<
    { x: number; y: number; color: string }[]
  >([]);

  // Simulate loading existing pixels
  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    const mockTotalDonations = 1256;
    setTotalPixels(mockTotalDonations);

    // Generate mock pixels for visualization
    const mockPixels = Array.from({ length: mockTotalDonations }, () => ({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      color: `hsl(${Math.random() * 260}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 30}%)`,
    }));

    setPixels(mockPixels);
  }, []);

  const handleDonateClick = () => {
    setPixDialogOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Botão de Um Milhão de Reais
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cada doação de R$1 adiciona um pixel à nossa galáxia coletiva.
            Juntos, vamos criar algo incrível!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative w-full aspect-square max-w-2xl border border-gray-800 rounded-lg overflow-hidden bg-gray-950">
            {/* Galaxy visualization */}
            <div className="absolute inset-0">
              {pixels.map((pixel, index) => (
                <div
                  key={index}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${pixel.x}%`,
                    top: `${pixel.y}%`,
                    backgroundColor: pixel.color,
                    boxShadow: `0 0 3px ${pixel.color}`,
                  }}
                />
              ))}
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg px-3 py-2 text-sm">
              <p>{totalPixels.toLocaleString("pt-BR")} pixels de 1.000.000</p>
              <div className="w-full bg-gray-700 h-1.5 mt-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${(totalPixels / 1000000) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-900/30"
            onClick={handleDonateClick}
          >
            Doe R$1 e Adicione seu Pixel
          </Button>

          <p className="text-sm text-gray-400 text-center max-w-md">
            100% das doações são transparentes e você pode acompanhar o
            crescimento da galáxia em tempo real.
          </p>
        </div>
      </div>

      <Dialog open={pixDialogOpen} onOpenChange={setPixDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Faça sua doação via Pix</DialogTitle>
            <DialogDescription>
              Escaneie o QR code abaixo ou copie a chave Pix para fazer sua
              doação de R$1
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-48 h-48 bg-white flex items-center justify-center rounded-lg">
              {/* In a real app, you would generate a real QR code */}
              <AlertCircle className="h-12 w-12 text-gray-400" />
              <span className="sr-only">QR Code do Pix</span>
            </div>

            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value="00000000000"
                readOnly
              />
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText("00000000000")}
              >
                Copiar
              </Button>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Após a confirmação do pagamento, seu pixel será adicionado
              automaticamente à galáxia.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
