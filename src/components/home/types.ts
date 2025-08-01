export interface Race {
    id: string;
    title?: string;
    description: string;
    dates?: string;
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
    bgImg?: string;
    btnsPosition?:
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
        | 'center';
    date: Date;
    mainBgImg?: string;
    mainBgColor?: string;
    mainTextColor?: string;
    datesTextColor?: string;
    datesNumsText?: string;
    datesMonthText?: string;
    aboutImgs?: string[];
    dateAndPlaceImgs?: string[];
    dateAndPlaceText: string;
    participantPackages?: {
        imgs: string[];
        description?: string;
    }[];
    routesImgs?: string[];
    routesText?: string;
    partners?: { img: string; categoryText: string }[];
}
