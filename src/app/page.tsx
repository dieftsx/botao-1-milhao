"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DonateButton from "./components/DonateButton";

export default function Home() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/total")
      .then((res) => res.json())
      .then((data) => setTotal(data.local));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className=""
          src="/logo.png"
          alt="Botão 1 Milhão logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <DonateButton />
        </div>
        Até o momento temos - R$ {total.toLocaleString("pt-BR")}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Conheça o projeto →
        </a>
      </footer>
    </div>
  );
}
