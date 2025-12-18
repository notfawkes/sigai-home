import React, { useState, useEffect, useMemo } from 'react';
import Aurora from './Aurora';
import RubiksCube from './RubiksCube';
import { StaircaseSection } from './StaircaseSection';
import { Footer } from './Footer';
import Hover3DCard from './Hover3dCard';
import Aboutus from './Aboutus';

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
    const heroFadeStart = 0;
    const heroFadeEnd = 3000;
    const scrollProgress = Math.min(Math.max((scrollY - heroFadeStart) / (heroFadeEnd - heroFadeStart), 0), 1);
    const heroOpacity = 1 - scrollProgress;
    const heroTransform = scrollProgress * 50;

    return {
        hoverCardSection: {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isMobile ? '3rem 1.25rem' : '6rem 2rem',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
        },

        hoverCardContainer: {
          width: '100%',
          maxWidth: '1100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        aboutSection: {
          width: '100%',
          position: 'relative',
          zIndex: 2,
          padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
        },
        aboutContainer: {
          width: '100%',
          maxWidth: '1100px',
        },
  
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

      {/* Aurora background */}
      {/* <div style={styles.liquidEtherContainer}>
        <Aurora
          colorStops={["#1a1a3e", "#2d2d5f", "#1a4d6f"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.4}
        />
      </div> */}

      {/* Gradient background */}
      <div style={styles.gradientBackground} />

      {/* Main content */}
      <div style={styles.contentWrapper}>
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

      <div style={styles.contentWrapper}>
        <div style={styles.canvasContainer}>
          <RubiksCube />
        </div>

        {/* Text content */}
<div style={styles.textContainer}>
  {/* Added light cyan color to match the image heading */}
  <h1 style={{ ...styles.mainHeading, color: '#AEEFFF' }}>
    ABOUT US
  </h1>

  <p style={styles.subHeading}>
    TCET ACM SIGAI is a professional body that was established in January 2023. It aims to bring together and inculcate research ideologies in people from all over India with a passion in the field of Artificial Intelligence and Machine Learning by means of conducting seminars, debates, Kaggle competitions, etc.
  </p>

  <br />

<p style={styles.subHeading}>
  {/* Added 2 spaces after 50+ */}
  <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>50+</span>&nbsp;&nbsp;&nbsp;&nbsp;Number of events<br />
  
  {/* Added 1 space after 100+ */}
  <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>100+</span>&nbsp;&nbsp;Members<br />
  
  {/* Added 2 spaces after 30% */}
  <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>30%</span>&nbsp;&nbsp;&nbsp;Growth per year<br />
</p>
</div>
      </div>
{/* 
      <div style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <Aboutus />
        </div>
      </div> */}

      <div style={styles.hoverCardSection}>
        <div style={styles.hoverCardContainer}>
          <Hover3DCard
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            mainImage="https://images.unsplash.com/photo-1518770660439-4636190af475"
            extraImages={[
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
              "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            ]}
          />
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
