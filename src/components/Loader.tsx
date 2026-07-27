import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
  progress: number;
  done: boolean;
  onExit: () => void;
}

export function Loader({ progress, done, onExit }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.to(barRef.current, {
      scaleX: Math.min(1, progress / 100),
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [progress]);

  useEffect(() => {
    if (!done || !rootRef.current) return;
    const tl = gsap.timeline({ onComplete: onExit });
    tl.to(rootRef.current.querySelectorAll('[data-loader-fade]'), {
      opacity: 0,
      y: -14,
      duration: 0.5,
      ease: 'power2.in',
      stagger: 0.05,
    }).to(
      rootRef.current,
      { yPercent: -100, duration: 0.9, ease: 'power4.inOut' },
      '-=0.1',
    );
  }, [done, onExit]);

  return (
    <div className="loader" ref={rootRef} role="status" aria-live="polite">
      <div className="loader-inner">
        <p className="loader-brand" data-loader-fade>
          bbbb <span>MEDICAL VISUAL</span>
        </p>
        <div className="loader-track" data-loader-fade>
          <span className="loader-bar" ref={barRef} />
        </div>
        <p className="loader-pct" data-loader-fade>
          {String(Math.min(100, Math.round(progress))).padStart(3, '0')}
          <span>%</span>
        </p>
      </div>
    </div>
  );
}
