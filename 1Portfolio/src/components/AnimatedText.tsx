import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharProps {
  char: string;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharProps> = ({ char, scrollYProgress, range }) => {
  const opacity = useTransform(scrollYProgress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 pointer-events-none select-none">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 pointer-events-none select-none"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Split into words while keeping track of character indices
  const words = useMemo(() => {
    return text.split(' ');
  }, [text]);

  const totalChars = text.length;

  // Track global index across words
  let globalCharIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`font-medium text-center leading-relaxed text-[#D7E2EA] ${className}`}
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
      }}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const renderedWord = (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const start = globalCharIndex / totalChars;
              const end = Math.min(1, (globalCharIndex + 1) / totalChars);
              globalCharIndex++;

              return (
                <Character
                  key={globalCharIndex}
                  char={char}
                  scrollYProgress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        // Account for space after word except last word
        let spaceElement = null;
        if (wordIndex < words.length - 1) {
          const spaceStart = globalCharIndex / totalChars;
          const spaceEnd = Math.min(1, (globalCharIndex + 1) / totalChars);
          globalCharIndex++;

          spaceElement = (
            <Character
              key={`space-${wordIndex}`}
              char=" "
              scrollYProgress={scrollYProgress}
              range={[spaceStart, spaceEnd]}
            />
          );
        }

        return (
          <React.Fragment key={wordIndex}>
            {renderedWord}
            {spaceElement}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default AnimatedText;
