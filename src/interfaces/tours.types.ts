export interface IRequestTours {
  title: string;
  shortDescription: string;
  description: string;

  city: string;
  country: string;
  address: string;

  latitude: number;
  longitude: number;

  durationInMinutes: number;

  minGuests: number;
  maxGuests: number;

  priceFrom: number;
  currency: string;

  coverImageUrl: string;
  imageUrls: string[];

  categoryIds: number[];

  metaTitle: string;
  metaDescription: string;
}

export interface IResponseToursCategories {
  data: IToursCategories[];
  success: boolean;
  message: any;
}

export interface IToursCategories {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  tourCategories: any[];
  tours: any[];
}
