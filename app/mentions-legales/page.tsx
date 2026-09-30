import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et informations sur l’éditeur du site METAMORPHOO MOVEMENT.',
  alternates: { canonical: '/mentions-legales' },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Mentions légales"
        eyebrow="Informations légales"
        title={<>Mentions légales</>}
        subtitle="Éditeur, hébergement, propriété intellectuelle et conditions d’utilisation du site."
        image="/images/stage-chrysalis.jpg"
      />

      <section className="section pt-8">
        <div className="container-x max-w-3xl space-y-8">
          {[
            {
              titre: 'Éditeur du site',
              contenu: [
                `${site.brand.fullName} — ${site.brand.baseline}.`,
                `Adresse : ${site.contact.address}.`,
                `Téléphone / WhatsApp : ${site.contact.whatsappDisplay}.`,
                `E-mail : ${site.contact.emails.join(', ')}.`,
                `Visionnaires : ${site.brand.founders}.`,
              ],
            },
            {
              titre: 'Nature de l’organisation',
              contenu: [
                'Metamorphoo est une organisation chrétienne à but non lucratif. Metamorphoo n’est pas une Église, mais un mouvement du Saint-Esprit pour les nations et une plateforme missionnaire.',
              ],
            },
            {
              titre: 'Hébergement',
              contenu: [
                'Le site est hébergé sur une plateforme d’hébergement web professionnelle (Vercel, Netlify ou équivalent) et le code source est publié sur GitHub. Les données des formulaires sont hébergées par Google (Google Forms / Google Sheets) dans le cadre de l’offre gratuite Google Workspace.',
              ],
            },
            {
              titre: 'Propriété intellectuelle',
              contenu: [
                'Le nom METAMORPHOO, le logo, les textes, visuels et illustrations sont la propriété du mouvement. Toute reproduction sans autorisation écrite est interdite. Les citations bibliques sont issues de la Bible Louis Segond (domaine public).',
              ],
            },
            {
              titre: 'Dons et contreparties',
              contenu: [
                'Les dons, offrandes, dîmes et vœux sont libres et sans contrepartie commerciale. Metamorphoo ne vend aucun produit ni service. Les partenariats de soutien font l’objet d’une convention écrite.',
              ],
            },
            {
              titre: 'Contact',
              contenu: [
                `Pour toute question relative au site : ${site.contact.emails[0]} ou WhatsApp ${site.contact.whatsappDisplay}.`,
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

          <Reveal className="text-center text-xs text-cream/40">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </Reveal>
        </div>
      </section>
    </>
  );
}
