import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité et de protection des données personnelles de METAMORPHOO MOVEMENT.',
  alternates: { canonical: '/confidentialite' },
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        breadcrumb="Confidentialité"
        eyebrow="Protection des données"
        title={<>Politique de confidentialité</>}
        subtitle="Quelles données nous collectons, pourquoi, et comment les supprimer."
        image="/images/stage-caterpillar.jpg"
      />

      <section className="section pt-8">
        <div className="container-x max-w-3xl space-y-8">
          {[
            {
              titre: 'Données collectées',
              contenu: [
                'Nous collectons uniquement les informations que vous nous transmettez volontairement : nom, e-mail, téléphone, ville, message, type de soutien et montant des dons.',
                'Aucune donnée bancaire n’est stockée sur ce site. Les paiements en ligne sont traités par les plateformes habilitées (FlexPaie, GeneraPay, opérateurs Mobile Money).',
              ],
            },
            {
              titre: 'Finalité',
              contenu: [
                'Vos données servent à vous recontacter, à organiser les activités, à suivre les candidatures et les formations, à vous remercier de votre soutien et à vous envoyer la lettre d’information si vous y avez consenti.',
              ],
            },
            {
              titre: 'Hébergement et durée de conservation',
              contenu: [
                'Les réponses aux formulaires sont enregistrées dans un tableur Google Sheets sécurisé, accessible uniquement à l’équipe habilitée. Elles sont conservées le temps nécessaire à la finalité du traitement, puis supprimées.',
              ],
            },
            {
              titre: 'Vos droits',
              contenu: [
                'Vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment en écrivant à ' +
                  site.contact.emails[0] +
                  '. Nous répondons sous 30 jours.',
              ],
            },
            {
              titre: 'Cookies',
              contenu: [
                'Ce site n’utilise pas de cookies publicitaires. Des contenus intégrés (YouTube, Facebook, Instagram, TikTok, Google Maps) peuvent déposer leurs propres cookies lorsque vous les visualisez.',
              ],
            },
            {
              titre: 'Sécurité',
              contenu: [
                'Le site est diffusé en connexion sécurisée (HTTPS). L’accès aux données est limité aux membres autorisés du mouvement.',
              ],
            },
          ].map((block, i) => (
            <Reveal key={block.titre} delay={((i % 3) + 1) as 1 | 2 | 3} className="glass rounded-3xl p-7">
              <h2 className="text-xl font-bold">{block.titre}</h2>
              <div className="mt-4 space-y-2.5">
                {block.contenu.map((ligne) => (
                  <p key={ligne} className="text-sm leading-relaxed text-cream/70">
                    {ligne}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
