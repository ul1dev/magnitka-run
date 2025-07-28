import type { NextPage } from 'next';
import styles from '../styles/Second.module.scss';

const Second: NextPage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className={styles.title}>Second Page</h1>
    </main>
  );
};

export default Second;
