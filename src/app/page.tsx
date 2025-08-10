import HomeRaces from '@/components/home/Races';
import { Race } from '@/components/home/types';
import HomeGalary from '@/components/home/Galary';
import HomeTimer from '@/components/home/Timer';

import bgImg from '@/app/static/images/ZEA_0745_1.jpg.webp';

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ??
    'http://localhost:8080';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') ? `${API_BASE}${u}` : u;
}
function normArr(a?: (string | null | undefined)[]): string[] | undefined {
    if (!a) return undefined;
    return a.map(norm).filter((x): x is string => Boolean(x)); // сузили до string[]
}

async function getRaces(): Promise<Race[]> {
    const res = await fetch(`${API_BASE}/races`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load races: ${res.status}`);
    const data = (await res.json()) as Race[];

    return data.map((r) => ({
        ...r,
        cardBgImg: norm(r.cardBgImg),
        mainBgImg: norm(r.mainBgImg),
        aboutImgs: normArr(r.aboutImgs),
        participantPackageImgs: normArr(r.participantPackageImgs),
        routesImgs: normArr(r.routesImgs),
        partners: r.partners?.map((p) => ({
            ...p,
            img: norm(p.img) || '', // в типе у тебя img: string
        })),
    }));
}

export default async function Home() {
    const races = await getRaces();

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bgImg.src})`,
                }}
                className="max-xl:bg-cover max-xl:bg-center bg-no-repeat xl:bg-[size:110%_auto] xl:bg-[position:90%_70%] h-[110vh] max-2xl:h-screen flex flex-col items-center justify-center text-white text-center"
            >
                <h1 className="font-extrabold uppercase text-7xl max-2xl:text-5xl max-lg:text-4xl max-[450px]:!text-3xl max-w-5xl max-2xl:max-w-3xl max-lg:max-w-lg max-sm:max-w-sm max-[450px]:!max-w-xs">
                    Беговое движение "азия-европа"
                </h1>
                <p className="max-sm:hidden text-xl max-2xl:text-base max-lg:text-sm mt-6 max-2xl:mt-4 max-lg:mt-3">
                    Стань частью движения, беги к своим мечтам.
                </p>
                <p className="sm:hidden text-base mt-6 max-[450px]:text-sm">
                    Присоединяйтесь к нам, участвуйте <br /> в забегах,
                    достигайте новых целей <br /> и побед.
                </p>
            </div>

            <HomeRaces items={races} />

            <HomeGalary />

            <HomeTimer />
        </>
    );
}
