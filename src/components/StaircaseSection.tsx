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
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsTyping(false);
            }, 1200);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
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
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-10 lg:px-16 py-10 lg:py-0 overflow-hidden">
      {/* Left Column - Text Content */}
      <div className="space-y-6 sm:space-y-10 lg:space-y-12 order-1 relative z-10">
        <div className="flex flex-wrap items-baseline gap-3 sm:gap-5 lg:gap-6">
          <h2
            className="text-foreground text-[48px] sm:text-[80px] lg:text-[96px] xl:text-[120px]"
            style={{ fontWeight: 600, lineHeight: 0.9 }}
          >
            We
          </h2>
          <div
            className="relative text-[48px] sm:text-[80px] lg:text-[96px] xl:text-[120px]"
            style={{ lineHeight: 0.9 }}
          >
            <span
              className="absolute top-0 left-0"
              style={{ fontWeight: 600, filter: "blur(4px)", opacity: 0.8, color: "#29D6C5" }}
            >
              {currentText}
            </span>
            <span style={{ fontWeight: 600, color: "#29D6C5" }}>
              {currentText}
            </span>
            {showCursor && (
              <>
                <span
                  className="absolute"
                  style={{ fontWeight: 600, filter: "blur(4px)", opacity: 0.8, color: "#29D6C5" }}
                >
                  |
                </span>
                <span className="ml-1" style={{ fontWeight: 600, color: "#29D6C5" }}>
                  |
                </span>
              </>
            )}
          </div>
        </div>

        <p
          className="text-foreground text-[16px] sm:text-[22px] lg:text-[26px] xl:text-[28px]"
          style={{ fontWeight: 400, lineHeight: "140%" }}
        >
          Association for Computing Machinery's Special Interest Group on Artificial Intelligence
        </p>

        <p
          className="text-muted-foreground text-[16px] sm:text-[22px] lg:text-[26px] xl:text-[28px]"
          style={{ fontWeight: 400, lineHeight: "150%" }}
        >
          An interdisciplinary group of academic and industrial researchers, practitioners, software
          developers, end users, and students who work together to promote and support the growth
          and application of AI principles and techniques throughout computing.
        </p>
      </div>

      {/* Right Column - Staircase Animation */}
      {/* UPDATE: Increased base height to h-[400px] to prevent top cut-off on mid-sized screens */}
      <div className="flex items-center justify-center h-[400px] sm:h-[450px] lg:h-[600px] order-2 w-full relative">
        <StaircaseAnimation />
      </div>
    </div>
  );
}