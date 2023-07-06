import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MenuOutput {
  @Field(() => String, {
    nullable: false,
    description: 'Menu_id',
  })
  _id: string;

  @Field(() => Int, {
    nullable: false,
    description: 'Menu unique code',
  })
  menuId: number;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the menu item',
  })
  name: string;

  @Field(() => String)
  description?: string;

  @Field(() => Int, {
    nullable: false,
  })
  price: number;

  @Field(() => String, {})
  category: string;

  @Field(() => Boolean, {})
  isAvailable: boolean;
}
