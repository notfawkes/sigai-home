import React, { useState, useEffect, useMemo } from 'react';
import RubiksCube from './RubiksCube';
import { StaircaseSection } from './StaircaseSection';
import { Footer } from './Footer';
import Hover3DCard from './Hover3dCard';
import Capture from './Capture';
import PublicationsRibbon from './PublicationsRibbon';
import tejas1 from '../assets/tejas-main.png'

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => {
  //   let ticking = false;
  //   const handleScroll = () => {
  //     if (!ticking) {
  //       window.requestAnimationFrame(() => {
  //         setScrollY(window.scrollY);
  //         ticking = false;
  //       });
  //       ticking = true;
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

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
          maxWidth: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        curvedBox: {
          maxWidth: '1400px',   // adjust: 900 / 1000 / 1100
          width: '100%',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '32px',
          padding: '48px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
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
        // opacity: heroOpacity,
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
      isolation: 'isolate',
    },
    mainHeading2: {
      fontSize: 'clamp(2rem, 8vw, 8rem)',
      fontWeight: 300,
      margin: 30,
      letterSpacing: 2,
      lineHeight: 0.9,
      fontFamily: "'Abril Fatface', sans-serif",
      color: '#00E0FF'
    },
    mainHeading3: {
      fontSize: 'clamp(1.1rem, 3vw, 3rem)',
      fontWeight: 300,
      margin: 30,
      letterSpacing: 2,
      lineHeight: 0.9,
      fontFamily: "'Abril Fatface', sans-serif",
    },
    mainHeading4: {
      fontSize: 'clamp(0.9rem, 1vw, 1rem)',
      fontWeight: 300,
      margin: 30,
      letterSpacing: 2,
      lineHeight: 1.8,
      fontFamily: "'Poppins', sans-serif",
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
            <h1
              style={{
                fontSize: "8rem",
                fontWeight: 800,
                lineHeight: 1.1,
                background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textFillColor: "transparent",
                letterSpacing: "0.05em",
                fontFamily: " 'Abril Fatface', serif "
              }}
            >
              TCET ACM<br />SIGAI
            </h1>

          <p style={styles.subHeading}>
            Student's Chapter
          </p>
        </div>
      </div>

<div style={styles.curvedBox}>
  <div style={styles.contentWrapper}>
    <div style={styles.canvasContainer}>
      <RubiksCube />
    </div>

    <div style={styles.textContainer}>
      <h1 style={{ ...styles.mainHeading, color: '#AEEFFF' }}>
        ABOUT US
      </h1>

      <p style={styles.subHeading}>
        TCET ACM SIGAI is a professional body that was established in January 2023...
      </p>

      <br />

      <p style={styles.subHeading}>
        <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>50+</span>&nbsp;&nbsp;&nbsp;&nbsp;Number of events<br />
        <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>100+</span>&nbsp;&nbsp;Members<br />
        <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>30%</span>&nbsp;&nbsp;&nbsp;Growth per year<br />
      </p>
    </div>
  </div>
</div>

{/* 
      <div style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <Aboutus />
        </div>
      </div> */}

      {/* <div style={styles.hoverCardSection}>
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
      </div> */}

<div style={{ 
  ...styles.contentWrapper, 
  display: 'flex', 
  justifyContent: 'flex-start',        // Hardcoded "nudge" to the left
  marginRight: typeof window !== 'undefined' && window.innerWidth > 1024 ? '-100px' : '0'
}}>
<div style={{ ...styles.textContainer }}>
  <PublicationsRibbon position="top" />
  <PublicationsRibbon position="bottom" />
  
  <h1 style={{ 
    color: '#00E5FF', // The vibrant cyan you requested
    fontSize: 'clamp(3rem, 10vw, 6rem)', 
    fontWeight: '300', 
    margin: '0',
    letterSpacing: '2px',
    fontFamily: "'Abril Fatface', serif"
  }}>
    EXPLORE
  </h1>

  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '-10px' }}>
    <p style={{ 
      color: '#00E5FF', 
      fontSize: '2rem', 
      fontWeight: '700', 
      margin: '0',
      fontFamily: "'Abril Fatface', serif" 
    }}>
      our newest
    </p>

    {/* Button with Link */}
    <a href="https://acm-sigai.vercel.app/Publications" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      <button
        className="
          rounded-full
          px-8 py-2
          text-md
          font-black
          text-[#07165F]
          transition-transform duration-300 ease-in-out
          hover:scale-105
          active:scale-95
          border-none
          focus:outline-none
          cursor-pointer
        "
        style={{ 
          backgroundColor: '#C2F3FF', // Specific light cyan background
          fontFamily: "'Abril Fatface', serif",
          color: 'black'
        }}
      >
        publications
      </button>
    </a>
  </div>

  <p style={{ 
    color: '#FFFFFF', 
    opacity: '0.8', 
    fontSize: '1.1rem', 
    maxWidth: '450px', 
    marginTop: '25px',
    lineHeight: '1.5',
    fontFamily: "'Poppins', sans-serif"
  }}>
    Explore our latest collection of publications that showcase our research, insights, and contributions across various topics and fields.
  </p>
</div>

  <div style={styles.hoverCardContainer}>
    <Hover3DCard
      mainImage={tejas1}
      extraImages={[
        "https://i.ibb.co/M57WVZHS/tejas1.png",
        "https://i.ibb.co/prfCg2F0/tejas2.png",
      ]}
    />
  </div>
</div>


      <div style={styles.stepContainer}>
        <StaircaseSection />
      </div>

      <div style={styles.stepContainer}>
        <Capture />
      </div>

      <div style={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
