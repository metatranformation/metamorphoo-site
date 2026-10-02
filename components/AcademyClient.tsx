'use client';

import { useEffect, useMemo, useState } from 'react';
import { Book, Check, Clock, Play, Shield } from './Icons';
import { academyModules, totalLessons } from '@/lib/content';
import { cn, youtubeThumb } from '@/lib/utils';
import { Reveal } from './Reveal';
import { useI18n } from './I18nProvider';

const STORAGE_KEY = 'metamorphoo-academy-progress';

type Lesson = (typeof academyModules)[number]['lecons'][number];

function useProgress() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw) as string[]);
    } catch {
      /* stockage indisponible */
    }
  }, []);

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* stockage indisponible */
      }
      return next;
    });

  return { done, toggle };
}

export function AcademyClient() {
  const { done, toggle } = useProgress();
  const { t, translateList } = useI18n();
  const [openModule, setOpenModule] = useState<string | null>(academyModules[0]?.id ?? null);
  const [playing, setPlaying] = useState<Lesson | null>(null);

  // Texte traduit depuis le dictionnaire, structure (id / image / videoId) depuis le contenu.
  const modules = useMemo(
    () =>
      academyModules.map((m) => ({
        id: m.id,
        image: m.image,
        niveau: t(`data.academy.${m.id}.niveau`),
        duree: t(`data.academy.${m.id}.duree`),
        titre: t(`data.academy.${m.id}.titre`),
        objectifs: translateList(`data.academy.${m.id}.objectifs`),
        lecons: m.lecons.map((l, i) => ({
          ...l,
          titre: t(`data.academy.${m.id}.lecons.${i}.titre`),
          resume: t(`data.academy.${m.id}.lecons.${i}.resume`),
        })),
      })),
    [t, translateList],
  );

  const lessonKey = (moduleId: string, index: number) => `${moduleId}-${index}`;

  const percent = useMemo(
    () => Math.round((done.length / Math.max(1, totalLessons)) * 100),
    [done.length],
  );

  return (
    <>
      {/* Progression */}
      <Reveal className="glass mt-12 rounded-3xl p-7 sm:p-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow mb-3">
              <Shield width={13} height={13} /> {t('academy.progress.eyebrow')}
            </p>
            <h3 className="text-2xl font-bold">
              {done.length} / {totalLessons} {t('academy.progress.title')}
            </h3>
            <p className="mt-2 max-w-md text-sm text-cream/60">{t('academy.progress.lead')}</p>
          </div>
          <div className="shrink-0 text-center">
            <span className="font-display text-5xl font-extrabold text-gradient">{percent}%</span>
          </div>
        </div>
        <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-300 via-emerald2-400 to-violet2-500 transition-all duration-700 ease-expo"
            style={{ width: `${percent}%` }}
          />
        </div>
      </Reveal>

      {/* Modules */}
      <div className="mt-10 space-y-5">
        {modules.map((module, mi) => {
          const open = openModule === module.id;
          const moduleDone = module.lecons.filter((_, i) => done.includes(lessonKey(module.id, i))).length;
          return (
            <Reveal key={module.id} delay={((mi % 3) + 1) as 1 | 2 | 3}>
              <article
                className={cn(
                  'glass overflow-hidden rounded-3xl transition-colors duration-500',
                  open ? 'border-gold-300/30' : 'border-white/10',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenModule(open ? null : module.id)}
                  className="flex w-full flex-col items-start gap-5 p-6 text-left sm:flex-row sm:items-center sm:p-7"
                  aria-expanded={open}
                >
                  <span className="relative h-20 w-full shrink-0 overflow-hidden rounded-2xl sm:h-16 sm:w-28">
                    <img src={module.image} alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-night-950/30" />
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-200">
                        {module.niveau}
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.62rem] text-cream/60">
                        {module.lecons.length} {t('academy.modules.lessons')}
                      </span>
                      <span className="flex items-center gap-1 text-[0.62rem] text-cream/50">
                        <Clock width={12} height={12} /> {module.duree}
                      </span>
                    </span>
                    <span className="mt-2 block font-display text-xl font-bold text-cream">{module.titre}</span>
                    <span className="mt-1.5 block text-xs text-cream/50">
                      {moduleDone} / {module.lecons.length} {t('academy.modules.done')}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500',
                      open ? 'rotate-180 border-gold-300 bg-gold-300 text-night-950' : 'border-white/15 text-cream/60',
                    )}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>

                {open && (
                  <div className="animate-rise-fade border-t border-white/10 p-6 sm:p-7">
                    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                      <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
                          {t('academy.modules.videoLessons')}
                        </h4>
                        <ul className="space-y-3">
                          {module.lecons.map((lesson, i) => {
                            const key = lessonKey(module.id, i);
                            const isDone = done.includes(key);
                            return (
                              <li
                                key={key}
                                className={cn(
                                  'flex items-center gap-4 rounded-2xl border p-3.5 transition-colors duration-300',
                                  isDone ? 'border-emerald2-400/30 bg-emerald2-500/10' : 'border-white/10 bg-white/[0.02]',
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => setPlaying(lesson)}
                                  className="group relative h-16 w-28 shrink-0 overflow-hidden rounded-xl"
                                  aria-label={`${t('academy.modules.play')} : ${lesson.titre}`}
                                >
                                  <img src={youtubeThumb(lesson.videoId)} alt="" className="h-full w-full object-cover" />
                                  <span className="absolute inset-0 grid place-items-center bg-night-950/40 transition-colors group-hover:bg-night-950/20">
                                    <Play width={18} height={18} className="text-gold-200" />
                                  </span>
                                </button>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-semibold text-cream">{lesson.titre}</p>
                                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-cream/50">
                                    {lesson.resume}
                                  </p>
                                  <p className="mt-1.5 text-[0.65rem] text-cream/40">{lesson.duree}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggle(key)}
                                  className={cn(
                                    'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[0.68rem] font-semibold transition-all duration-300',
                                    isDone
                                      ? 'bg-emerald2-500 text-night-950'
                                      : 'border border-white/15 text-cream/60 hover:border-white/30 hover:text-cream',
                                  )}
                                >
                                  <Check width={13} height={13} />
                                  {isDone ? t('academy.modules.marked') : t('academy.modules.mark')}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
                          <Book width={14} height={14} /> {t('academy.modules.objectives')}
                        </h4>
                        <ul className="space-y-3">
                          {module.objectifs.map((o) => (
                            <li key={o} className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/70">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                              {o}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 rounded-2xl border border-gold-300/25 bg-gold-400/10 p-4">
                          <p className="text-xs font-semibold text-gold-100">{t('academy.modules.evaluation')}</p>
                          <p className="mt-1.5 text-xs leading-relaxed text-cream/70">
                            {t('academy.modules.evaluationText')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Lecteur modal */}
      {playing && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-night-950/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          onClick={() => setPlaying(null)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-gold-200">{playing.titre}</p>
              <button
                type="button"
                onClick={() => setPlaying(null)}
                className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-cream/80 hover:text-cream"
              >
                {t('home.youtube.close')} ✕
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black shadow-card">
              <iframe
                src={`https://www.youtube.com/embed/${playing.videoId}?autoplay=1&rel=0`}
                title={playing.titre}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AcademyClient;
