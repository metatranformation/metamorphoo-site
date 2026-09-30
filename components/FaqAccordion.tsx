import { ChevronDown } from './Icons';
import { faq } from '@/lib/content';
import { Reveal } from './Reveal';

/** FAQ accessible (details/summary — fonctionne même sans JavaScript). */
export function FaqAccordion() {
  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-3">
      {faq.map((item, i) => (
        <Reveal key={item.question} delay={((i % 4) + 1) as 1 | 2 | 3}>
          <details className="group glass overflow-hidden rounded-2xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-cream transition-colors duration-300 hover:text-gold-200">
              {item.question}
              <ChevronDown
                width={18}
                height={18}
                className="shrink-0 text-gold-300 transition-transform duration-500 group-open:rotate-180"
              />
            </summary>
            <div className="border-t border-white/10 px-6 py-5 text-sm leading-relaxed text-cream/70">
              {item.reponse}
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

export default FaqAccordion;
