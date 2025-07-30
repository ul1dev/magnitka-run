import MainLayout from '@/components/MainLayout';

import bgImg from '@/app/static/images/ZEA_0745_1.jpg.webp';

interface Marathon {
    title?: string;
    dates?: string;
    isRegBtn?: boolean;
    regBtnUrl?: string;
    regBtnTextColor?: string;
    regBtnBgColor?: string;
    regBtnBorderColor?: string;
    isMoreBtn?: boolean;
    moreBtnUrl?: string;
    bgColor?: string;
    bgImg?: string;
    btnsPosition?:
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
        | 'center';
}

export default function Home() {
    const marathons: Marathon[] = [
        {
            title: `Полумарафон\nАзия-Европа`,
            dates: '6-7 сентября',
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1056',
            regBtnTextColor: '#003593',
            regBtnBgColor: '#FFFFFF',
            isMoreBtn: true,
            moreBtnUrl: '/asia-europehalfmarathon',
            bgImg: '/static/images/marathon-asia-europe.jpg',
        },
        {
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1014',
            regBtnTextColor: '#16bc05',
            regBtnBgColor: '#FFFFFF',
            bgImg: '/static/images/marathon-asia-europe.jpg',
            btnsPosition: 'top-right',
        },
        {
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1004',
            regBtnTextColor: '#003593',
            regBtnBgColor: '#FFFFFF',
            bgImg: '/static/images/marathon-asia-europe.jpg',
            btnsPosition: 'top-right',
        },
    ];

    return (
        <MainLayout title="Беговое сообщество - Азия-Европа в Магнитогорске">
            <div className="bg-black">
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
            </div>

            <div className="bg-white rounded-[50px] max-2xl:rounded-4xl max-lg:rounded-3xl -mt-10 px-6 max-sm:px-4 max-[500px]:!px-3 pt-20 pb-10 max-lg:pb-6 max-sm:pb-4 max-[500px]:!pb-3 relative z-10">
                <h2 className="font-extrabold uppercase text-7xl max-2xl:text-5xl max-lg:text-4xl max-[500px]:!text-3xl max-[450px]:!text-2xl max-[360px]:!text-xl max-sm:text-center  animate__animated animate__fadeInRight">
                    Почувствуй ритм <br /> движения
                </h2>
                <p className="mt-2 max-sm:text-center text-xl max-2xl:text-base max-lg:text-sm max-[500px]:!text-xs ">
                    Участвуй в забегах, созданных для тебя и твоих близких.
                </p>

                <div className="grid grid-cols-2 justify-between mt-12 gap-6">
                    <div className="w-full h-48 bg-blue-500 rounded-2xl"></div>
                    <div className="w-full h-48 bg-blue-500 rounded-2xl"></div>
                    <div className="w-full h-48 bg-blue-500 rounded-2xl"></div>
                </div>
            </div>

            <div className="bg-[#f7f7f7] pt-28 pb-20">
                <h2>Галерея моментов</h2>
            </div>
        </MainLayout>
    );
}
