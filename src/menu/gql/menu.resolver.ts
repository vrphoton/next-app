import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MenuOutput } from './menu.output';
import { CreateMenuInput, UpdateMenu } from './menu.input';
import { MenuService } from '../menu.service';

@Resolver()
export class MenuResolver {
  constructor(private menuService: MenuService) {}

  @Query(() => [MenuOutput])
  getAll() {
    return this.menuService.findAll();
  }

  @Query(() => MenuOutput)
  async getMenu(@Args('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Mutation(() => MenuOutput)
  async createMenu(@Args('data') menu: CreateMenuInput) {
    return this.menuService.create(menu);
  }

  @Mutation(() => MenuOutput)
  async updateMenu(
    @Args('id') id: string,
    @Args('input') product: UpdateMenu,
  ) {
    return this.menuService.update(id, product);
  }

  @Mutation(() => String)
  async deleteMenu(@Args('id') id: string) {
    return this.menuService.remove(id);
  }
}
