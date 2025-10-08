import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        // Opcional: Si solo quieres permitir rutas específicas
        // pathname: '/PokeAPI/sprites/master/sprites/pokemon/**' 
      },
    ],
  },
};

export default nextConfig;
