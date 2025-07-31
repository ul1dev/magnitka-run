import MainLayout from '@/components/MainLayout';
import bgImg from '@/app/static/images/ZEA_0745_1.jpg.webp';
import Races from '@/components/home/Races';
import { Race } from '@/components/home/types';
import Galary from '@/components/home/Galary';

export default function Home() {
    const races: Race[] = [
        {
            title: `Полумарафон\nАзия-Европа`,
            dates: '6-7 сентября',
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1056',
            regBtnTextColor: '#003593',
            regBtnBgColor: '#FFFFFF',
            isMoreBtn: true,
            moreBtnUrl: '/asia-europehalfmarathon',
            moreBtnTextColor: '#FFFFFF',
            moreBtnBorderColor: '#FFFFFF',
            bgImg: 'https://optim.tildacdn.com/tild3338-6562-4138-a365-653138396332/-/format/webp/_2_2.jpg.webp',
            date: new Date('2025-09-06'),
        },
        {
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1014',
            regBtnTextColor: '#16bc05',
            regBtnBgColor: '#FFFFFF',
            bgImg: 'https://static.tildacdn.com/tild3531-3932-4365-a266-323063346535/photo.jpeg',
            btnsPosition: 'top-right',
            date: new Date('2025-09-12'),
        },
        {
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1004',
            regBtnTextColor: '#003593',
            regBtnBgColor: '#FFFFFF',
            bgImg: 'https://optim.tildacdn.com/tild6261-3862-4130-a565-386534373836/-/format/webp/__2025-04-22__123030.png.webp',
            btnsPosition: 'center',
            date: new Date('2025-09-20'),
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

            <Races items={races} />

            <Galary />
        </MainLayout>
    );
}
