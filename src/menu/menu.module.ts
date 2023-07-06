import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from "./menu.repository";
import { Menu, MenuSchema } from "./models/menu.model";
import { MenuResolver } from './gql/menu.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  controllers: [MenuController],
  providers: [MenuRepository, MenuService, MenuResolver],
  exports: [MenuService]
})
export class MenuModule {}
