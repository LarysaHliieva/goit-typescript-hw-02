export interface ImageItem {
  id: number;
  webformatURL: string;
  tags: string;
  largeImageURL: string;
}

export interface ImagesResponse {
  hits: ImageItem[];
  total: number;
  totalHits: number;
}
