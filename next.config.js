/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === 'true' || process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Export 100% statique (GitHub Pages, Netlify Drop, tout hébergeur de fichiers)
  ...(isExport
    ? {
        output: 'export',
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),

  // Sous-chemin du dépôt GitHub Pages (ex: /metamorphoo-site)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
