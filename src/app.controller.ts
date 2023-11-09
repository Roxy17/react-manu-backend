import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';

@ApiTags('')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-menu')
  getHello(): string {
    return this.appService.getMenu();
  }

  @ApiBody({ type: CreateMenuDto })
  @Post('add_menu')
  async addMenu(@Body() body: CreateMenuDto) {
    return this.appService.addMenu(body);
  }
}
