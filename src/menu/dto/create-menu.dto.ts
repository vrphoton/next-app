export interface CreateMenuDTO {
    menuId: number;
    name: string;
    description: string;
    price: number;
    category?: string;
    isAvailable?: boolean;
  }
  