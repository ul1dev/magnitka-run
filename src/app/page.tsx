import HomeRaces from '@/components/home/Races';
import { Race, TeamMember } from '@/components/home/types';
import HomeGalary, { GalleryImage } from '@/components/home/Galary';
import HomeTimer from '@/components/home/Timer';

import bgImg from '@/app/static/images/ZEA_0745_1.jpg.webp';
import HomeTeams from '@/components/home/Team';

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

async function getTeamMembers(): Promise<TeamMember[]> {
    const res = await fetch(`${API_BASE}/team`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load races: ${res.status}`);
    const data = (await res.json()) as TeamMember[];

    return data.map((r) => ({
        ...r,
        img: norm(r.img) || '',
    }));
}

interface MainPageData {
    id?: string;
    mainBgImg: string | null;
    galleryFirstLineImgs: GalleryImage[] | null;
    gallerySecondLineImgs: GalleryImage[] | null;
    createdAt?: string;
    updatedAt?: string;
}

async function getMainPage(): Promise<MainPageData> {
    try {
        const res = await fetch(`${API_BASE}/main-page`, {
            cache: 'no-store',
        });
        if (!res.ok) {
            return {
                mainBgImg: null,
                galleryFirstLineImgs: null,
                gallerySecondLineImgs: null,
            };
        }
        return (await res.json()) as MainPageData;
    } catch {
        return {
            mainBgImg: null,
            galleryFirstLineImgs: null,
            gallerySecondLineImgs: null,
        };
    }
}

export default async function Home() {
    const races = await getRaces();
    const teamMembers = await getTeamMembers();
    const mainPage = await getMainPage();

    const heroBg =
        (mainPage.mainBgImg && norm(mainPage.mainBgImg)) || bgImg.src;

    const firstLineImgs =
        mainPage.galleryFirstLineImgs?.map((img) => ({
            ...img,
            src: norm(img.src) ?? img.src,
        })) ?? null;

    const secondLineImgs =
        mainPage.gallerySecondLineImgs?.map((img) => ({
            ...img,
            src: norm(img.src) ?? img.src,
        })) ?? null;

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${heroBg})`,
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

            <HomeGalary
                firstLineImgs={firstLineImgs}
                secondLineImgs={secondLineImgs}
            />

            <HomeTimer />

            {teamMembers?.length && teamMembers?.length > 0 && (
                <HomeTeams items={teamMembers} />
            )}
        </>
    );
}
