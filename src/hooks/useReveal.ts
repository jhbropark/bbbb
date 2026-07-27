import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals every [data-reveal] descendant of `ref` with a staggered rise as the
 * section scrolls into view. Skips animation (renders visible) when disabled.
 */
export function useReveal(ref: RefObject<HTMLElement>, enabled = true): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!targets.length) return;

    if (!enabled) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 30 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 80%' },
      });
    }, el);

    return () => ctx.revert();
  }, [ref, enabled]);
}
