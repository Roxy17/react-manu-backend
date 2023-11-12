import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import fs = require('fs');
import path = require('path');
import { MenuDto } from './dto/menu.dto';

@Injectable()
export class AppService {
  getMenu(): string {
    const menuArr = this.readMenu();

    return JSON.stringify(menuArr);
  }

  addMenu(menu: MenuDto) {
    const menuData = this.readMenu();
    const isExistMenu = menuData.find((item) => item.id === menu.id);

    if (isExistMenu) {
      throw new ConflictException('Menu already exist');
    } else {
      menuData.push(menu);

      this.writeMenu(menuData);
    }

    return menu;
  }

  updateMenu(menu: MenuDto) {
    const menuData = this.readMenu();
    const isExistMenu = menuData.find((item) => item.id === menu.id);

    if (isExistMenu) {
      const updateMenu = menuData.map((item) => {
        if (item.id === menu.id) {
          return {
            id: menu.id,
            title: menu.title,
            description: menu.description,
            image: menu.image,
          };
        }
        return item;
      });

      this.writeMenu(updateMenu);

      return 'Menu succession update';
    } else {
      throw new NotFoundException('Menu not found');
    }

    return menu;
  }

  deleteMenu(id: number) {
    const menuData: MenuDto[] = this.readMenu();
    const isExistMenu = menuData.find((item) => item.id === id);

    if (!isExistMenu) {
      throw new NotFoundException('Menu not found');
    } else {
      const updateMenu = menuData.filter((item) => item.id !== id);

      this.writeMenu(updateMenu);
    }

    return 'menu delete';
  }

  getDir(name: string, num: number) {
    const updateSrc = `${__dirname.slice(0, num)}/src/jsons/`;
    return path.resolve(updateSrc, `${name}.json`);
  }

  readMenu() {
    const dir = this.getDir('menu', -5);

    try {
      const dataJson = fs.readFileSync(dir, 'utf-8');
      const res = JSON.parse(dataJson);

      return res;
    } catch (error) {
      return [];
    }
  }

  writeMenu(menu: MenuDto[]) {
    const dir = this.getDir('menu', -5);

    fs.writeFile(dir, JSON.stringify(menu), 'utf-8', (error) => {
      if (error) {
        console.info('write error ' + error);
        throw new NotFoundException('WRITE ERROR');
      } else {
        console.info('file written');
      }
    });
  }
}
