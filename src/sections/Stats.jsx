import { useEffect, useRef, useState } from "react";
import { Award, HeartHandshake, Siren, Users } from "lucide-react";
import useCountUp from "../hooks/useCountUp";
import { cn, containerClass } from "../lib/utils";
import Reveal from "../components/Reveal";

const STATS = [
  { icon: Award, value: 25, suffix: "+", label: "Years of Care" },
  { icon: Users, value: 100, suffix: "+", label: "Specialists" },
  { icon: HeartHandshake, value: 50, suffix: "K+", label: "Patients Served" },
  { icon: Siren, value: 24, suffix: "/7", label: "Emergency Support" },
];

function StatItem({ icon: Icon, value, suffix, label, active }) {
  const count = useCountUp(value, active);

  return (
    <div className="flex flex-col items-center px-4 py-6 text-center sm:py-7">
      <span className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-primary-50 text-primary-600">
        <Icon size={20} aria-hidden="true" />
      </span>
      <p className="font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-[2.6rem]">
        {count}
        <span className="text-primary-600">{suffix}</span>
      </p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Hospital statistics" className="border-y border-line bg-white">
      <Reveal className={cn(containerClass)}>
        <div
          ref={ref}
          className="grid grid-cols-2 divide-line [&>*]:border-line max-lg:gap-y-0 max-lg:[&>*:nth-child(odd)]:border-r max-lg:[&>*:nth-child(-n+2)]:border-b lg:grid-cols-4 lg:divide-x"
        >
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} active={active} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
