"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

const GalaxyAnimation = ({ donations }) => {
  const particles = useMemo(() => {
    return donations.map((donation) => ({
      position: [
        random.inRange(-10, 10),
        random.inRange(-5, 5),
        random.inRange(-10, 10),
      ],
      color: donation.amount > 1 ? "#FFD700" : "#4B0082",
      size: Math.min(0.1 + donation.amount / 10, 0.5),
    }));
  }, [donations]);

  useFrame((state, delta) => {
    // Animação suave das partículas
    particles.forEach((particle, i) => {
      particle.position[1] += delta * 0.1;
      if (particle.position[1] > 5) {
        particle.position[1] = -5;
      }
    });
  });

  return (
    <Points
      positions={particles.map((p) => p.position)}
      colors={particles.map((p) => p.color)}
      sizes={particles.map((p) => p.size)}
    >
      <PointMaterial transparent vertexColors sizeAttenuation={false} />
    </Points>
  );
};

export default function GalaxyDonation() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/donations-stream");

    eventSource.onmessage = (e) => {
      const newDonation = JSON.parse(e.data);
      setDonations((prev) => [...prev.slice(-999), newDonation]); // Mantém máximo 1000 estrelas
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="h-[600px] w-full relative">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <GalaxyAnimation donations={donations} />
      </Canvas>

      <div className="absolute bottom-4 left-4 text-white">
        <p>Estrelas na galáxia: {donations.length}</p>
        <p>Última doação: {donations[donations.length - 1]?.amount || 0} BRL</p>
      </div>
    </div>
  );
}
