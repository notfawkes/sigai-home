import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlowingIsometricBlock } from './GlowingIsometricBlock';

type AnimationPhase = 'initial' | 'landing' | 'building' | 'hold' | 'disassembling';

export function StaircaseAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [numBlocks, setNumBlocks] = useState(0);
  const [blockRotation, setBlockRotation] = useState(90); // Start vertical

  const maxBlocks = 7;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'initial') {
      // Initial state with vertical block - transition to landing after 800ms
      timeout = setTimeout(() => {
        setBlockRotation(0); // Rotate to horizontal
        setNumBlocks(1);
        setPhase('landing');
      }, 800);
    } else if (phase === 'landing') {
      // After landing animation (400ms), start building after 250ms
      timeout = setTimeout(() => {
        setPhase('building');
      }, 400 + 250);
    } else if (phase === 'building') {
      // Add blocks one by one with 250ms + 300ms (animation) intervals
      if (numBlocks < maxBlocks) {
        timeout = setTimeout(() => {
          setNumBlocks(numBlocks + 1);
        }, 250 + 300);
      } else {
        // All blocks built, move to hold phase
        timeout = setTimeout(() => {
          setPhase('hold');
        }, 300);
      }
    } else if (phase === 'hold') {
      // Hold the complete staircase for 1200ms
      timeout = setTimeout(() => {
        setPhase('disassembling');
      }, 1200);
    } else if (phase === 'disassembling') {
      // Remove blocks one by one with 150ms + 250ms (animation) intervals
      if (numBlocks > 0) {
        timeout = setTimeout(() => {
          setNumBlocks(numBlocks - 1);
        }, 150 + 250);
      } else {
        // All blocks removed, loop back to initial
        timeout = setTimeout(() => {
          setBlockRotation(90); // Back to vertical
          setPhase('initial');
        }, 800);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, numBlocks]);

  return (
    <div className="relative w-full h-full flex items-center justify-center scale-75 sm:scale-90 lg:scale-100">
      <div className="relative w-[400px] h-[380px] sm:w-[500px] sm:h-[450px] lg:w-[600px] lg:h-[550px]">
        <AnimatePresence mode="sync">
          {Array.from({ length: numBlocks }).map((_, index) => {
            const isFirstBlock = index === 0;
            // Create diagonal staircase - each block moves up and to the right
            const verticalOffset = index * 55; // Steps up
            const horizontalOffset = index * 75; // Steps to the right

            return (
              <motion.div
                key={index}
                initial={
                  isFirstBlock && phase === 'landing'
                    ? { opacity: 0, y: 0, scale: 1, rotate: 0 } // First block fades in
                    : { opacity: 0, y: -60, scale: 0.85, rotate: 0 } // Other blocks appear from above
                }
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotate: isFirstBlock ? blockRotation : 0 // First block rotates from 90° to 0°
                }}
                exit={{ opacity: 0, y: 30, scale: 0.85, rotate: 0 }}
                transition={{
                  duration: isFirstBlock ? 0.8 : 0.4,
                  ease: [0.4, 0, 0.2, 1], // Ease in and out
                  rotate: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } // Bouncy rotation
                }}
                className="absolute"
                style={{
                  bottom: `${100 + verticalOffset}px`,
                  left: `${30 + horizontalOffset}px`,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  filter: 'drop-shadow(0 0 25px rgba(41, 214, 197, 0.6)) drop-shadow(0 0 45px rgba(167, 139, 250, 0.5)) drop-shadow(0 0 60px rgba(251, 113, 133, 0.4))',
                }}
              >
                <GlowingIsometricBlock />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
