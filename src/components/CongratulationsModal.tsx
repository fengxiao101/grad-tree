import { useEffect, useRef } from 'react';
import { X, GraduationCap } from 'lucide-react';

interface Props {
  onClose: () => void;
}

function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ['#8C1515', '#B83A4B', '#FFD700', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#00BCD4'];
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: Math.random() * 8 + 4,
      h: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 1.5,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.15,
    }));

    let running = true;
    function draw() {
      if (!running || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;
        p.vx += (Math.random() - 0.5) * 0.1;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
    return () => { running = false; };
  }, [canvasRef]);
}

export function CongratulationsModal({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useConfetti(canvasRef);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded"
        >
          <X size={16} />
        </button>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-cardinal-50 flex items-center justify-center">
            <GraduationCap size={32} className="text-cardinal-700" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">The tree is fully grown!</h2>
        <p className="text-gray-600 mb-1">Every requirement tracked in this plan has been fulfilled.</p>
        <p className="text-sm text-gray-400 mb-6">Time to bring your plan to life.</p>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-cardinal-700 text-white font-semibold rounded-xl hover:bg-cardinal-800 transition-colors"
        >
          Keep Planning
        </button>
      </div>
    </div>
  );
}
