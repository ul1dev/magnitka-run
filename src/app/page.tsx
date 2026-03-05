import HomeRaces from '@/components/home/Races';
import { Race, TeamMember } from '@/components/home/types';
import HomeGalary, { GalleryImage } from '@/components/home/Galary';
import HomeTimer from '@/components/home/Timer';

import bgImg from '@/app/static/images/ZEA_0745_1.jpg.webp';
import HomeTeams from '@/components/home/Team';

const API_BASE =
    (process.env.API_BASE ?? process.env.NEXT_PUBLIC_API_BASE)?.replace(
        /\/$/,
        '',
    ) ?? 'http://localhost:8080';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') ? `${API_BASE}${u}` : u;
}
function normArr(a?: (string | null | undefined)[]): string[] | undefined {
    if (!a) return undefined;
    return a.map(norm).filter((x): x is string => Boolean(x)); // сузили до string[]
}

type LoadResult<T> = { data: T; error?: string };

async function getRaces(): Promise<LoadResult<Race[]>> {
    try {
        const res = await fetch(`${API_BASE}/races`, { cache: 'no-store' });
        if (!res.ok) {
            return {
                data: [],
                error: `Не удалось загрузить список забегов (HTTP ${res.status}).`,
            };
        }
        const data = (await res.json()) as Race[];

        return {
            data: data.map((r) => ({
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
                pressBlocks: r.pressBlocks?.map((pb) => ({
                    ...pb,
                    img: norm(pb.img) || '',
                })),
            })),
        };
    } catch (e) {
        return {
            data: [],
            error:
                e instanceof Error
                    ? `Не удалось загрузить список забегов: ${e.message}`
                    : 'Не удалось загрузить список забегов.',
        };
    }
}

async function getTeamMembers(): Promise<LoadResult<TeamMember[]>> {
    try {
        const res = await fetch(`${API_BASE}/team`, { cache: 'no-store' });
        if (!res.ok) {
            return {
                data: [],
                error: `Не удалось загрузить команду (HTTP ${res.status}).`,
            };
        }
        const data = (await res.json()) as TeamMember[];

        return {
            data: data.map((r) => ({
                ...r,
                img: norm(r.img) || '',
            })),
        };
    } catch (e) {
        return {
            data: [],
            error:
                e instanceof Error
                    ? `Не удалось загрузить команду: ${e.message}`
                    : 'Не удалось загрузить команду.',
        };
    }
}

interface MainPageData {
    id?: string;
    mainBgImg: string | null;
    galleryFirstLineImgs: GalleryImage[] | null;
    gallerySecondLineImgs: GalleryImage[] | null;
    mainTimerDate: string;
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
                mainTimerDate: '2026-09-06',
            };
        }
        return (await res.json()) as MainPageData;
    } catch {
        return {
            mainBgImg: null,
            galleryFirstLineImgs: null,
            gallerySecondLineImgs: null,
            mainTimerDate: '2026-09-06',
        };
    }
}

export default async function Home() {
    const [racesRes, teamRes, mainPage] = await Promise.all([
        getRaces(),
        getTeamMembers(),
        getMainPage(),
    ]);

    const placeholderRaces: Race[] = [
        {
            id: 'placeholder-1',
            title: 'Скоро',
            date: '2099-01-01',
            cardTitle: 'Скоро<br/>новый забег',
            cardDates: 'Следи за анонсами',
            bgColor: '#003593',
            btnsPosition: 'bottom-right',
            isRegBtn: true,
            regBtnUrl: 'https://t.me/Asiaeuropemgn',
            regBtnBorderColor: '#FFFFFF',
            regBtnTextColor: '#FFFFFF',
        },
        {
            id: 'placeholder-2',
            title: 'Скоро',
            date: '2099-01-02',
            cardTitle: 'Открытие<br/>регистрации',
            cardDates: 'Уже скоро',
            bgColor: '#111827',
            btnsPosition: 'bottom-right',
            isRegBtn: true,
            regBtnUrl: 'https://t.me/Asiaeuropemgn',
            regBtnBorderColor: '#FFFFFF',
            regBtnTextColor: '#FFFFFF',
        },
    ];

    const racesForUi =
        racesRes.data.length > 0 ? racesRes.data : placeholderRaces;

    // Не показываем ошибки загрузки на главной — вместо этого выводим заглушки/пустые секции.

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

            <HomeRaces items={racesForUi} />

            <HomeGalary
                firstLineImgs={firstLineImgs}
                secondLineImgs={secondLineImgs}
            />

            <HomeTimer
                targetDate={
                    mainPage.mainTimerDate
                        ? (() => {
                              const [, month, day] =
                                  mainPage.mainTimerDate.split('-');
                              return `${day}.${month}`;
                          })()
                        : undefined
                }
            />

            {Boolean(teamRes.data?.length) && teamRes.data?.length > 0 && (
                <HomeTeams items={teamRes.data} />
            )}
        </>
    );
}
