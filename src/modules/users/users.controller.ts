import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './models/dto/';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { FilterUserDto } from './models/dto/filter.user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  getAllUsers(@Query() filters: FilterUserDto) {
    return this.usersService.getAllUsers(filters);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
