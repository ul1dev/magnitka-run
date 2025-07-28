import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className={styles.title}>Index Page</h1>
    </main>
  );
};

export default Home;
