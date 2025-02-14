export interface SearchResult {
  objectID: string;
  vendor: string | null;
  productName: string | null;
  price?: number | null;
  upc?: string | null;
  storeName?: string | null;
  totalQuantityOnHand?: number;
  category?: string | null;
  _geoloc?: {
    lat: number;
    lng: number;
  };
  distance?: number;
}