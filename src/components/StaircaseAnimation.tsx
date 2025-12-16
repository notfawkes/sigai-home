import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlowingIsometricBlock } from './GlowingIsometricBlock';

type AnimationPhase = 'initial' | 'landing' | 'building' | 'hold' | 'disassembling';

export function StaircaseAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [numBlocks, setNumBlocks] = useState(0);
  const [blockRotation, setBlockRotation] = useState(90);

  const maxBlocks = 7;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'initial') {
      timeout = setTimeout(() => {
        setBlockRotation(0);
        setNumBlocks(1);
        setPhase('landing');
      }, 800);
    } else if (phase === 'landing') {
      timeout = setTimeout(() => {
        setPhase('building');
      }, 650);
    } else if (phase === 'building') {
      if (numBlocks < maxBlocks) {
        timeout = setTimeout(() => {
          setNumBlocks(numBlocks + 1);
        }, 550);
      } else {
        timeout = setTimeout(() => {
          setPhase('hold');
        }, 300);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => {
        setPhase('disassembling');
      }, 1200);
    } else if (phase === 'disassembling') {
      if (numBlocks > 0) {
        timeout = setTimeout(() => {
          setNumBlocks(numBlocks - 1);
        }, 400);
      } else {
        timeout = setTimeout(() => {
          setBlockRotation(90);
          setPhase('initial');
        }, 800);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, numBlocks]);

  return (
    // UPDATED CONTAINER CLASSES:
    // 1. Added `-translate-x-10` to the base class for small mobiles.
    // 2. Increased shift to `-translate-x-16` for larger phones.
    // 3. Reset to `translate-x-0` on large desktop screens (`lg`) where space is ample.
    <div className="relative w-full h-full flex items-center justify-center 
      scale-[0.45] min-[400px]:scale-[0.52] min-[500px]:scale-[0.62] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 
      -translate-x-10 min-[450px]:-translate-x-16 sm:-translate-x-20 lg:translate-x-0
      origin-center transition-transform duration-300">
      
      <div className="relative w-[650px] h-[600px]">
        <AnimatePresence mode="sync">
          {Array.from({ length: numBlocks }).map((_, index) => {
            const isFirstBlock = index === 0;
            const verticalOffset = index * 55; 
            const horizontalOffset = index * 75;

            return (
              <motion.div
                key={index}
                initial={
                  isFirstBlock && phase === 'landing'
                    ? { opacity: 0, y: 0, scale: 1, rotate: 0 }
                    : { opacity: 0, y: -60, scale: 0.85, rotate: 0 }
                }
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotate: isFirstBlock ? blockRotation : 0
                }}
                exit={{ opacity: 0, y: 30, scale: 0.85, rotate: 0 }}
                transition={{
                  duration: isFirstBlock ? 0.8 : 0.4,
                  ease: [0.4, 0, 0.2, 1],
                  rotate: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
                }}
                className="absolute"
                style={{
                  bottom: `${80 + verticalOffset}px`,
                  left: `${0 + horizontalOffset}px`,
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