import { useEffect, useRef } from 'react';
import fearTreeImg from '../assets/fear_the_tree_DVD_3.png';

const NORMAL_SPEED = 1.5;
const FLEE_SPEED   = 7;

export function FearTheTree() {
  const ref            = useRef<HTMLImageElement>(null);
  const centerRef      = useRef({ x: -1, y: -1 });
  const velRef         = useRef({ x: NORMAL_SPEED, y: NORMAL_SPEED });
  const mouseRef       = useRef({ x: -9999, y: -9999 });
  const initializedRef = useRef(false);

  useEffect(() => {
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const el = ref.current;
      if (!el) { rafId = requestAnimationFrame(animate); return; }

      const sectionTabs = document.querySelector('.section-tabs');
      const header      = document.querySelector('header');
      const topBound    = sectionTabs?.getBoundingClientRect().bottom
                       ?? header?.getBoundingClientRect().bottom
                       ?? 60;

      const w = el.offsetWidth;
      const h = el.offsetHeight;

      const minCx = w / 2;
      const maxCx = window.innerWidth - w / 2;
      const minCy = topBound + h / 2;
      const maxCy = window.innerHeight - h / 2;

      if (!initializedRef.current && w > 0 && maxCx > minCx && maxCy > minCy) {
        centerRef.current.x = Math.random() * (maxCx - minCx) + minCx;
        centerRef.current.y = Math.random() * (maxCy - minCy) + minCy;
        velRef.current.x = Math.random() < 0.5 ? NORMAL_SPEED : -NORMAL_SPEED;
        velRef.current.y = Math.random() < 0.5 ? NORMAL_SPEED : -NORMAL_SPEED;
        initializedRef.current = true;
      }

      if (initializedRef.current) {
        const dx   = centerRef.current.x - mouseRef.current.x;
        const dy   = centerRef.current.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);

        const fleeDist = window.innerWidth < 640 ? 25 : 50;
        if (dist < fleeDist && dist > 1) {
          const norm = FLEE_SPEED / dist;
          velRef.current.x = dx * norm;
          velRef.current.y = dy * norm;
        } else {
          const tx = (velRef.current.x >= 0 ? 1 : -1) * NORMAL_SPEED;
          const ty = (velRef.current.y >= 0 ? 1 : -1) * NORMAL_SPEED;
          velRef.current.x += (tx - velRef.current.x) * 0.05;
          velRef.current.y += (ty - velRef.current.y) * 0.05;
        }

        centerRef.current.x += velRef.current.x;
        centerRef.current.y += velRef.current.y;

        if (centerRef.current.x < minCx) { centerRef.current.x = minCx; velRef.current.x =  Math.abs(velRef.current.x); }
        if (centerRef.current.x > maxCx) { centerRef.current.x = maxCx; velRef.current.x = -Math.abs(velRef.current.x); }
        if (centerRef.current.y < minCy) { centerRef.current.y = minCy; velRef.current.y =  Math.abs(velRef.current.y); }
        if (centerRef.current.y > maxCy) { centerRef.current.y = maxCy; velRef.current.y = -Math.abs(velRef.current.y); }

        el.style.transform = `translate(${centerRef.current.x - w / 2}px, ${centerRef.current.y - h / 2}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <img
      ref={ref}
      src={fearTreeImg}
      alt="FEAR THE TREE"
      className="fixed top-0 left-0 z-[9998] pointer-events-none select-none w-12 sm:w-20 fear-the-tree-img"
      style={{ willChange: 'transform', opacity: 0.15 }}
    />
  );
}
