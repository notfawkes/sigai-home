import { Suspense } from 'react';
import RubiksCube from '@/components/RubiksCube';
import CubeErrorBoundary from '@/components/CubeErrorBoundary';
import '@/components/About-us.css';

type Stat = { value: string; label: string };

const StatsItem = ({ value, label }: Stat) => (
  <li className="about_cl">
    <strong>{value}</strong>
    <span>{label}</span>
  </li>
);

const stats: Stat[] = [
  { value: '50+', label: 'Number of events' },
  { value: '100+', label: 'Members' },
  { value: '30%', label: 'Growth per year' },
];

const Aboutus = () => {
  return (
    <main className="about">
      <section className="content">
        <h1 className="title_about">ABOUT US</h1>

        <p className="about_info">
          TCET ACM SIGAI is a professional body that was established in January 2023.
          It aims to bring together and inculcate research ideologies in people from all over
          India with a passion in the field of Artificial Intelligence and Machine Learning by
          means of conducting seminars, debates, Kaggle competitions, etc.
        </p>

        <ul className="stats-list" aria-label="Key statistics">
          {stats.map((stat) => (
            <StatsItem key={stat.label} {...stat} />
          ))}
        </ul>
      </section>

      <section className="cube-wrapper" aria-hidden="true">
        <CubeErrorBoundary>
          <Suspense fallback={<div className="loading">Loading 3D content...</div>}>
            <RubiksCube />
          </Suspense>
        </CubeErrorBoundary>
      </section>
    </main>
  );
};

export default Aboutus;
