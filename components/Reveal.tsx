'use client';

import { useEffect, useRef, useState, type ReactNode, type Ref } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
};

/** Apparition douce au défilement (Intersection Observer, sans dépendance). */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      className={cn('reveal', visible && 'is-visible', delay ? `reveal-delay-${delay}` : null, className)}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
