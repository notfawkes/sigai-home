import { useState, useEffect } from 'react';
import { StaircaseAnimation } from './StaircaseAnimation';

const words = ["Inspire", "Create", "Transform", "Collaborate"];

export function StaircaseSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isInitialDelay, setIsInitialDelay] = useState(true);

  const currentWord = words[currentWordIndex];

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Initial delay before starting animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInitialDelay(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  // Typing and deleting animation
  useEffect(() => {
    if (isPaused || isInitialDelay) return;

    const timeout = setTimeout(
      () => {
        if (isTyping) {
          // Typing
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            // Finished typing, pause before deleting
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsTyping(false);
            }, 1200);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Finished deleting, move to next word with delay
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsTyping(true);
              setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }, 800);
          }
        }
      },
      isTyping ? 150 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, currentWord, isPaused, isInitialDelay, currentWordIndex]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16 px-6 sm:px-10 lg:px-16">
      {/* Left Column - Text Content */}
      <div className="space-y-8 sm:space-y-10 lg:space-y-12 order-1">
        {/* Animated Header */}
        <div className="flex items-baseline gap-4 sm:gap-5 lg:gap-6 flex-wrap">
          <h2
            className="text-foreground text-[64px] sm:text-[80px] lg:text-[96px] xl:text-[120px]"
            style={{
              fontWeight: 600,
              lineHeight: 0.9,
            }}
          >
            We
          </h2>
          <div
            className="relative text-[64px] sm:text-[80px] lg:text-[96px] xl:text-[120px]"
            style={{ lineHeight: 0.9 }}
          >
            {/* Glow layer (blurred duplicate) */}
            <span
              className="absolute top-0 left-0"
              style={{
                fontWeight: 600,
                filter: "blur(4px)",
                opacity: 0.8,
                color: "#29D6C5",
              }}
            >
              {currentText}
            </span>
            {/* Main text layer */}
            <span
              style={{
                fontWeight: 600,
                color: "#29D6C5",
              }}
            >
              {currentText}
            </span>
            {/* Cursor */}
            {showCursor && (
              <>
                <span
                  className="absolute"
                  style={{
                    fontWeight: 600,
                    filter: "blur(4px)",
                    opacity: 0.8,
                    color: "#29D6C5",
                  }}
                >
                  |
                </span>
                <span
                  className="ml-1"
                  style={{
                    fontWeight: 600,
                    color: "#29D6C5",
                  }}
                >
                  |
                </span>
              </>
            )}
          </div>
        </div>

        {/* Sub-heading */}
        <p
          className="text-foreground text-[18px] sm:text-[22px] lg:text-[26px] xl:text-[28px]"
          style={{
            fontWeight: 400,
            lineHeight: "140%",
          }}
        >
          Association for Computing Machinery's Special Interest Group on Artificial Intelligence
        </p>

        {/* Body Text */}
        <p
          className="text-muted-foreground text-[18px] sm:text-[22px] lg:text-[26px] xl:text-[28px]"
          style={{
            fontWeight: 400,
            lineHeight: "150%",
          }}
        >
          An interdisciplinary group of academic and industrial researchers, practitioners, software
          developers, end users, and students who work together to promote and support the growth
          and application of AI principles and techniques throughout computing.
        </p>
      </div>

      {/* Right Column - Staircase Animation */}
      <div className="flex items-center justify-center h-[350px] sm:h-[450px] lg:h-[600px] order-2">
        <StaircaseAnimation />
      </div>
    </div>
  );
}
