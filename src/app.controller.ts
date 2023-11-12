import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MenuDto } from './dto/menu.dto';
import { DeleteMenuDto } from './dto/delete-menu.dto';

@ApiTags('')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-menu')
  getHello(): string {
    return this.appService.getMenu();
  }

  @ApiBody({ type: MenuDto })
  @Post('add-menu')
  async addMenu(@Body() body: MenuDto) {
    return this.appService.addMenu(body);
  }

  @ApiBody({ type: MenuDto })
  @Put('update-menu')
  async UpdateMenu(@Body() body: MenuDto) {
    return this.appService.updateMenu(body);
  }

  @ApiBody({ type: DeleteMenuDto })
  @Delete('delete-menu')
  async deleteMenu(@Body('id') id: number) {
    return this.appService.deleteMenu(id);
  }
}
