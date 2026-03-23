import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.ceil(value / 40);
          const interval = setInterval(() => {
            current += step;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl lg:text-4xl font-bold text-accent">
        +{count}{suffix}
      </div>
      <div className="font-body text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent font-medium font-body text-sm uppercase tracking-wider">Nuestra Esencia</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">
              Conectamos el campo con tu hogar
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              En JJ Garden creemos que la alimentación saludable comienza con productos de verdadera calidad.
              Trabajamos directamente con agricultores locales para ofrecerte lo más fresco, nutritivo y delicioso
              que la tierra puede dar.
            </p>

            <div className="bg-secondary rounded-xl p-6 border-l-4 border-accent mb-8">
              <Quote className="h-6 w-6 text-accent mb-2" />
              <p className="font-body text-foreground italic">
                "Cada producto que entregamos lleva el compromiso de frescura, trazabilidad y respeto por la tierra."
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <AnimatedStat value={200} suffix="" label="Clientes felices" />
              <AnimatedStat value={50} suffix="" label="Productos frescos" />
              <AnimatedStat value={100} suffix="%" label="Origen garantizado" />
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=700&fit=crop"
              alt="Productos frescos de JJ Garden"
              className="rounded-2xl shadow-xl w-full object-cover h-[400px] lg:h-[500px]"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur-sm rounded-xl p-4 text-primary-foreground">
              <p className="font-display text-lg font-semibold">Nuestros valores</p>
              <p className="font-body text-sm text-primary-foreground/80">Frescura · Calidad · Sostenibilidad · Confianza</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
