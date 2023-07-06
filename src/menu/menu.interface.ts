export interface IMenu {
    _id?: string;
    menuId: number;
    name: string;
    description: string;
    price: number;
    category?: string;
    isAvailable?: boolean;
  }
  
  export interface IUpdateMenu {
    _id?: string;
    menuId?: number;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    isAvailable?: boolean;
  }
  