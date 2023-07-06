import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
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
    @Field(() => String, {})
    description: string;
    @Field(() => Number, { nullable: false })
    price: number;
    @Field(() => String, {})
    category?: string;
    @Field(() => Boolean, {})
    isAvailable?: boolean;
}

@InputType()
export class UpdateMenu {
    @Field(() => String, {
        nullable: false,
        description: 'Menu unique Object Id',
    })
    _id: string;
    @Field(() => Int, {
        nullable: false,
        description: 'Menu unique code',
    })
    menuId?: number;
    @Field(() => String, {
        nullable: false,
        description: 'Name of the menu item',
    })
    name?: string;
    @Field(() => String, {})
    description?: string;
    @Field(() => Number, { nullable: false })
    price?: number;
    @Field(() => String, {})
    category?: string;
    @Field(() => Boolean, {})
    isAvailable?: boolean;
}
