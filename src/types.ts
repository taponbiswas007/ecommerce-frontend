export interface Product {
  id: number;
  name: string;
  short_description: string;
  description: string;
  price: number;
  discount: number;
  net_price: number;
  main_image: string;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  image_5: string | null;
  video_url: string | null;
  is_active: boolean;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
}

export interface CategoryWithProducts {
  id: number;
  name: string;
  products: Product[];
}