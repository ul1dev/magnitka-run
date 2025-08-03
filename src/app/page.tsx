import HomeRaces from '@/components/home/Races';
import { Race } from '@/components/home/types';
import HomeGalary from '@/components/home/Galary';
import HomeTimer from '@/components/home/Timer';

import bgImg from '@/app/static/images/ZEA_0745_1.jpg.webp';

export default function Home() {
    const races: Race[] = [
        {
            id: 'aca7ebe2-d2a3-4d63-b542-678ec5e54d26',
            cardTitle: `Полумарафон<br />Азия-Европа`,
            cardDates: '6-7 сентября',
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1056',
            regBtnTextColor: '#003593',
            regBtnBgColor: '#FFFFFF',
            isMoreBtn: true,
            moreBtnTextColor: '#FFFFFF',
            moreBtnBorderColor: '#FFFFFF',
            cardBgImg:
                'https://optim.tildacdn.com/tild3338-6562-4138-a365-653138396332/-/format/webp/_2_2.jpg.webp',
            mainBgImg:
                'https://optim.tildacdn.com/tild6166-6630-4033-a365-326264386430/-/format/webp/_13.jpg.webp',
            date: '2025-09-06',
            title: 'Полумарафон Азия-Европа',
            description: ``,
            dateAndPlaceText: ``,
        },
        {
            id: '4c86a4bc-61c3-4076-a143-0a571dd5174c',
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1014',
            regBtnTextColor: '#16bc05',
            regBtnBgColor: '#FFFFFF',
            cardBgImg:
                'https://static.tildacdn.com/tild3531-3932-4365-a266-323063346535/photo.jpeg',
            btnsPosition: 'top-right',
            date: '2025-09-12',
            title: '',
            description: '',
            dateAndPlaceText: ``,
        },
        {
            id: '96f37dd8-5b80-45f4-aafe-e07b736c2b34',
            isRegBtn: true,
            regBtnUrl: 'https://myrace.info/events/1004',
            regBtnTextColor: '#003593',
            regBtnBgColor: '#FFFFFF',
            cardBgImg:
                'https://optim.tildacdn.com/tild6261-3862-4130-a565-386534373836/-/format/webp/__2025-04-22__123030.png.webp',
            btnsPosition: 'center',
            date: '2025-09-20',
            title: '',
            description: '',
            dateAndPlaceText: ``,
        },
    ];

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
