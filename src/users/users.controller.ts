import { Controller, Post, UseGuards, Get, UseInterceptors, Body, UploadedFile, Patch, Param, NotFoundException, UsePipes, ValidationPipe, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';
import { multerOptions } from '../config/multer.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { FileMiddleware } from 'src/middlewares/file.validator';
import * as fs from 'fs.promises';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileMiddleware)
  @UseInterceptors(FileInterceptor('profilePicture'))
  async createUser(@UploadedFile() file, @Body() createUserDto: CreateUserDto) {
    let base64Image = null;
    if (file && file.path) {
      try {
        const buffer = await fs.readFile(file.path);
        base64Image = buffer.toString('base64');
      } catch (error) {
        throw new InternalServerErrorException('Error reading file');
      }
    }
    createUserDto.profilePicture = base64Image;
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileMiddleware)
  @UseInterceptors(FileInterceptor('profilePicture', multerOptions))
  async updateUser(@UploadedFile() file, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let base64Image = null;
    if (file && file.path) {
      try {
        const buffer = await fs.readFile(file.path);
        base64Image = buffer.toString('base64');
      } catch (error) {
        throw new InternalServerErrorException('Error reading file');
      }
    }
    updateUserDto.profilePicture = base64Image
    const updatedUser = await this.usersService.update(id, updateUserDto);

    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}