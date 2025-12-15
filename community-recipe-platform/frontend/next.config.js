/** @type {import('next').NextConfig} */
const nextConfig = {
  // Wymagane, aby Next.js prawidłowo obsługiwał moduły
  experimental: {
    // Umożliwia użycie Server Actions (nowoczesny sposób komunikacji)
    serverActions: true, 
  },
};

module.exports = nextConfig;
