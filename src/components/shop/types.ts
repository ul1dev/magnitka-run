export interface ShopProduct {
    id: string;
    article: string;
    price: number;
    title: string;
    info: string;
    imgs: string[];
    discountProcent?: number;
    description?: string;
    sizesTitle?: string;
    sizes?: { isUnavailable: boolean; value: string }[];
    createdAt: string;
    updatedAt: string;
}
