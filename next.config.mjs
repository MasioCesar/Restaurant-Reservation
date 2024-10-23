/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/**', // Isso permite acessar qualquer caminho dentro do domínio
        },
      ],
    },
    reactStrictMode: false, // Mova esta linha para dentro do objeto nextConfig
  };
  
  // Exporte o objeto de configuração corretamente
  export default nextConfig;
  