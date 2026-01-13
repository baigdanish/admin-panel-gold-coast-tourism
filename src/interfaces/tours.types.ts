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
