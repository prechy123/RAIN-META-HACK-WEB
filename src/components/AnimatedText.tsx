"use client";

import SplitText from "./SplitText";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedText({
  text,
  delay = 100,
  duration = 0.6,
  className = "",
}: AnimatedTextProps) {
  return (
    <div>
      <SplitText
        text={text}
        className={`text-2xl font-semibold text-center drop-shadow-md ${className}`}
        delay={delay}
        duration={duration}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={() => {}}
      />
    </div>
  );
}
