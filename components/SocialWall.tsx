import { ArrowUpRight, FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from './Icons';
import { site } from '@/lib/content';
import { Reveal } from './Reveal';

const ICONS: Record<string, (p: { width?: number; height?: number }) => JSX.Element> = {
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
};

const DESCRIPTIONS: Record<string, string> = {
  youtube: 'Enseignements complets, temps de louange, replays des camps et conférences.',
  facebook: 'Annonces d’événements, témoignages et vie de la communauté.',
  instagram: 'Photos, citations et coulisses des actions Metamorphoo.',
  tiktok: 'Extraits courts, versets du jour et messages de réveil.',
};

/** Mur social : Facebook (plugin officiel), Instagram et TikTok (liens & intégrations). */
export function SocialWall() {
  const facebook = site.socials.find((s) => s.id === 'facebook');
  const instagram = site.socials.find((s) => s.id === 'instagram');
  const tiktok = site.socials.find((s) => s.id === 'tiktok');

  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-3">
      {/* Facebook — plugin officiel */}
      <Reveal delay={1}>
        <div className="glass flex h-full flex-col overflow-hidden rounded-3xl p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2]/15 text-[#4f9dff]">
              <FacebookIcon width={19} height={19} />
            </span>
            <div>
              <h3 className="text-sm font-bold">Facebook</h3>
              <p className="text-[0.7rem] text-cream/50">{facebook?.handle}</p>
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white">
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebook?.url || '')}&tabs=timeline&width=340&height=420&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
              title="Fil Facebook Metamorphoo"
              width="100%"
              height="420"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              loading="lazy"
            />
          </div>
          <a href={facebook?.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 !py-2.5 !text-xs">
            Suivre la page <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </Reveal>

      {/* Instagram */}
      <Reveal delay={2}>
        <div className="glass flex h-full flex-col overflow-hidden rounded-3xl p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E1306C]/15 text-[#f06a95]">
              <InstagramIcon width={19} height={19} />
            </span>
            <div>
              <h3 className="text-sm font-bold">Instagram</h3>
              <p className="text-[0.7rem] text-cream/50">{instagram?.handle}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#E1306C]/10 via-violet2-500/10 to-gold-400/10 p-6">
            <p className="text-sm leading-relaxed text-cream/75">{DESCRIPTIONS.instagram}</p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {['/images/action-camps.jpg', '/images/action-concerts.jpg', '/images/action-humanitaire.jpg'].map((src) => (
                <img key={src} src={src} alt="" className="h-20 w-full rounded-lg object-cover" />
              ))}
            </div>
          </div>
          <a href={instagram?.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 !py-2.5 !text-xs">
            Voir le profil <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </Reveal>

      {/* TikTok */}
      <Reveal delay={3}>
        <div className="glass flex h-full flex-col overflow-hidden rounded-3xl p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-cream">
              <TiktokIcon width={19} height={19} />
            </span>
            <div>
              <h3 className="text-sm font-bold">TikTok</h3>
              <p className="text-[0.7rem] text-cream/50">{tiktok?.handle}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#25F4EE]/10 via-violet2-500/10 to-[#FE2C55]/10 p-6">
            <p className="text-sm leading-relaxed text-cream/75">{DESCRIPTIONS.tiktok}</p>
            <div className="mt-6 flex items-end gap-1.5">
              {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-[#25F4EE]/70 to-[#FE2C55]/70"
                  style={{ height: `${h * 0.7}px` }}
                />
              ))}
            </div>
          </div>
          <a href={tiktok?.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 !py-2.5 !text-xs">
            Suivre sur TikTok <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </Reveal>
    </div>
  );
}

export default SocialWall;
