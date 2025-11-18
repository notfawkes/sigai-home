import React, { useState, useEffect, useMemo } from 'react';
import Aurora from './Aurora';
import RubiksCube from './RubiksCube';
import { StaircaseSection } from './StaircaseSection';
import { Footer } from './Footer';
import Navbar from './Navbar';

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = useMemo(() => {
    // Calculate scroll progress (0 to 1) for hero section fade
    const heroFadeStart = 0;
    const heroFadeEnd = 600;
    const scrollProgress = Math.min(Math.max((scrollY - heroFadeStart) / (heroFadeEnd - heroFadeStart), 0), 1);
    const heroOpacity = 1 - scrollProgress;
    const heroTransform = scrollProgress * 50;

    return {
      container: {
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      liquidEtherContainer: {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: heroOpacity,
        transition: 'opacity 0.1s ease-out',
      },
      gradientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: '#0a0a1f',
        opacity: heroOpacity,
        transition: 'opacity 0.1s ease-out',
      },
      contentWrapper: {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '6rem 1.5rem 2rem' : '8rem 4rem 4rem',
        boxSizing: 'border-box',
        opacity: heroOpacity,
        transform: `translateY(-${heroTransform}px)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
      },
    canvasContainer: {
      position: 'relative',
      width: isMobile ? '70vw' : '45vw',
      maxWidth: '600px',
      height: isMobile ? '70vw' : '45vw',
      maxHeight: '600px',
      zIndex: 2,
      flexShrink: 0,
      order: isMobile ? -1 : 1,
    },
    textContainer: {
      flex: 1,
      marginTop: isMobile ? '2rem' : 0,
      color: '#e8f0ff',
      textAlign: isMobile ? 'center' : 'left',
    },
    mainHeading: {
      fontSize: 'clamp(2.5rem, 8vw, 8rem)',
      fontWeight: 700,
      margin: 0,
      letterSpacing: 2,
      lineHeight: 1.1,
      fontFamily: "'Abril Fatface', serif",
    },
    subHeading: {
      fontSize: 'clamp(0.9rem, 2vw, 2rem)',
      marginTop: '1rem',
      fontFamily: "'Poppins', sans-serif",
    },
    stepContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: isMobile ? '3rem' : '5rem',
      marginBottom: isMobile ? '2rem' : '3rem',
      position: 'relative',
      zIndex: 2,
    },
      footerContainer: {
        position: 'relative',
        zIndex: 3,
        width: '100%',
      },
    };
  }, [isMobile, scrollY]);

  return (
    <div style={styles.container}>
      <Navbar isMobile={isMobile} />

      {/* Aurora background */}
      <div style={styles.liquidEtherContainer}>
        <Aurora
          colorStops={["#1a1a3e", "#2d2d5f", "#1a4d6f"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.4}
        />
      </div>

      {/* Gradient background */}
      <div style={styles.gradientBackground} />

      {/* Main content */}
      <div style={styles.contentWrapper}>
        {/* Rubik's Cube */}
        <div style={styles.canvasContainer}>
          <RubiksCube />
        </div>

        {/* Text content */}
        <div style={styles.textContainer}>
          <h1 style={styles.mainHeading}>
            TCET ACM<br />SIGAI
          </h1>
          <p style={styles.subHeading}>
            Student's Chapter
          </p>
        </div>
      </div>

      <div style={styles.stepContainer}>
        <StaircaseSection />
      </div>
      <div style={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
