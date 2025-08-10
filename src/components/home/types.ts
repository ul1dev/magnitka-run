export interface Race {
    id: string;
    cardTitle?: string;
    cardDates?: string;
    title: string;
    description?: string;
    isRegBtn?: boolean;
    regBtnUrl?: string;
    regBtnTextColor?: string;
    regBtnBgColor?: string;
    regBtnBorderColor?: string;
    isMoreBtn?: boolean;
    moreBtnTextColor?: string;
    moreBtnBgColor?: string;
    moreBtnBorderColor?: string;
    bgColor?: string;
    cardBgImg?: string;
    btnsPosition?:
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
        | 'center';
    date: string;
    mainBgImg?: string;
    mainBgColor?: string;
    mainTextColor?: string;
    datesTextColor?: string;
    datesNumsText?: string;
    datesMonthText?: string;
    aboutImgs?: string[];
    dateAndPlaceText?: string;
    participantPackageText?: string;
    participantPackageImgs?: string[];
    routesImgs?: string[];
    routesText?: string;
    partners?: { img: string; categoryText: string; link?: string }[];
}
