import { DEFAULT_LOCALE, localePath, withBasePath } from '@/lib/i18n';

/**
 * Racine du site : redirige vers la langue principale (français).
 * Export statique — redirection méta, aucun serveur requis.
 * Le préfixe du dépôt GitHub Pages est ajouté via `withBasePath`.
 */
export default function RootPage() {
  const target = withBasePath(localePath(DEFAULT_LOCALE, '/'));

  return (
    <html lang={DEFAULT_LOCALE}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
        <title>METAMORPHOO</title>
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#04060F',
          color: '#F7F3EA',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <p style={{ textAlign: 'center', padding: '1.5rem' }}>
          Redirection vers{' '}
          <a href={target} style={{ color: '#F9A227' }}>
            {target}
          </a>
          …
        </p>
      </body>
    </html>
  );
}
