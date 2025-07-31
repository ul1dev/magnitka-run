export interface Race {
    title?: string;
    dates?: string;
    isRegBtn?: boolean;
    regBtnUrl?: string;
    regBtnTextColor?: string;
    regBtnBgColor?: string;
    regBtnBorderColor?: string;
    isMoreBtn?: boolean;
    moreBtnUrl?: string;
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
}
