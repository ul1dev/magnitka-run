import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Index() {
    return (
        <>
            <Head>
                <title>Беговое сообщество - Азия-Европа в Магнитогорске</title>
            </Head>
            <Header />
            <main></main>
            <Footer />
        </>
    );
}
