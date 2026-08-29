import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

/**
 * Scroll-reveal wrapper — fades/slides content in the first time it enters
 * the viewport. Respects prefers-reduced-motion.
 *
 * <Reveal delay={120} className="…">…</Reveal>
 */
export default function Reveal({ as: Tag = "div", delay = 0, className, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={visible ? "visible" : "hidden"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
