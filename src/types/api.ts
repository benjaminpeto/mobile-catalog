/** Error response from the API */
export interface ErrorEntity {
  error: string;
  message: string;
}

/** A single product in list endpoints */
export interface ProductListEntity {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

/** Full product detail */
export interface ProductEntity {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: ProductSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: ProductListEntity[];
}

/** Shared specs object */
export interface ProductSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

/** One of the available color variants */
export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

/** One of the available storage variants */
export interface StorageOption {
  capacity: string;
  price: number;
}
