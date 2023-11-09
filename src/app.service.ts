import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import fs = require('fs');
import path = require('path');
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class AppService {
  getMenu(): string {
    const menuArr = this.readMenu();

    return JSON.stringify(menuArr);
  }

  addMenu(menu: CreateMenuDto) {
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

  writeMenu(menu: CreateMenuDto) {
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
