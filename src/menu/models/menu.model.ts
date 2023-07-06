import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Menu {
  @Prop({ required: [true, "Menu ID is required"], unique: [true, "Menu ID should be unique"] })
  menuId: string;

  @Prop({ required: [true, "Name is required"], minlength: [3, "Minimum 3 characters"], maxlength: [100, "Minimum 100 characters"] })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: [true, "Price is required"], min: 1}) 
  price: number;

  @Prop({ default: 'veg', enum: ['veg', 'non-veg'] })
  category: string;

  @Prop({ required: [true, "Menu availability is required"] })
  isAvailable: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
