import { Injectable } from '@nestjs/common';
import { CreateMenuDTO } from './dto/create-menu.dto';
import { UpdateMenuDTO } from './dto/update-menu.dto';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {

  constructor(private menuRepository: MenuRepository) {}
  async create(createMenuDto: CreateMenuDTO) {
    return this.menuRepository.createMenu(createMenuDto);
  }

  async findAll() {
    return this.menuRepository.findMenu();
  }

  async findOne(id: string) {
    return this.menuRepository.findMenuById(id);
  }

  async update(id: string, updateMenuDto: UpdateMenuDTO) {
    return this.menuRepository.updateMenu(id, updateMenuDto);
  }

  async remove(id: string) {
    return this.menuRepository.removeMenu(id);
  }
}
