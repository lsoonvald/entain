import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UserService } from './services/user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}



    @Get()
    @ApiResponse({ status: 200, type: UserEntity, isArray: true })
    getUsers(): Promise<UserEntity[]> {
        return this.userService.getUsers();
    }

    @Post()
    @ApiResponse({ status: 200, type: UserEntity, isArray: true })
    createUser(@Body() data: UserEntity): Promise<UserEntity> {
        return this.userService.createUser(data);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, type: UserEntity, isArray: true })
    deleteUser(@Param('id') id: string): Promise<DeleteResult> {
        return this.userService.deleteUser(id);
    }

    @Put()
    @ApiResponse({ status: 200, type: UserEntity, isArray: true })
    updateUser(@Body() data: UserEntity): Promise<UpdateResult> {
        return this.userService.updateUser(data);
    }
}
