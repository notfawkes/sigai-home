import { Suspense, useMemo } from 'react';
import PropTypes from 'prop-types';
import RubiksCube from './Cube';
import CubeErrorBoundary from './CubeErrorBoundary';
import './About-us.css';

const StatsItem = ({ value, label }) => (
  <li className="about_cl">
    <strong>{value}</strong>
    <span>{label}</span>
  </li>
);

StatsItem.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

const stats = [
  { value: '50+', label: 'Number of events' },
  { value: '100+', label: 'Members' },
  { value: '30%', label: 'Growth per year' }
];

function Aboutus({ isMobile }) {
  const styles = useMemo(() => {
    const heroFadeStart = 0;
    const heroFadeEnd = 600;
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
        heroAboutContainer: {
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '2rem',
          padding: isMobile ? '0 1rem' : '0 2rem',
        },
        heroLeftColumn: {
          flex: 1,
          minWidth: 0,
        },
        heroRightColumn: {
          width: isMobile ? '100%' : '45vw',
          maxWidth: '600px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-end',
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
    canvasSticky: {
      position: 'relative',
      width: isMobile ? '70vw' : '45vw',
      maxWidth: '600px',
      height: isMobile ? '70vw' : '45vw',
      maxHeight: '600px',
      zIndex: 2,
      marginLeft: 'auto',
      marginRight: isMobile ? 0 : '4rem',
      flexShrink: 0,
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
    <main className="about">
      <section className="cube-wrapper" aria-hidden="true">
        <CubeErrorBoundary>
          <Suspense fallback={<div className="loading">Loading 3D content...</div>}>
            <div style={styles.canvasContainer}>
              <RubiksCube />
            </div>
          </Suspense>
        </CubeErrorBoundary>
      </section>

      <section className="content">
        <h1 className="title_about">ABOUT US</h1>

        <p className="about_info">
          TCET ACM SIGAI is a professional body that was established in January 2023.
          It aims to bring together and inculcate research ideologies in people from all over
          India with a passion in the field of Artificial Intelligence and Machine Learning.
        </p>

        <ul className="stats-list" aria-label="Key statistics">
          {stats.map(stat => (
            <StatsItem key={stat.label} {...stat} />
          ))}
        </ul>
      </section>
    </main>
  );
}

Aboutus.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default Aboutus;
