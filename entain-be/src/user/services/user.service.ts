import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { mockUser } from 'user/helpers/user';
import { OfficeEntity } from 'office/office.entity';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity, 'main')
    private readonly userRepository: Repository<UserEntity>
  ) {}

  onModuleInit() {
    if (process.env.MODE === 'DEV') this.createDefaultTestUser();
  }

  async createDefaultTestUser(): Promise<void> {
    const defaultUser = await this.userRepository.findOne(1);
    if (!defaultUser) this.userRepository.save(mockUser);
  }

  async findByEmailUser(email: string, error = true): Promise<UserEntity | null> {

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user && error) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);
    }

    return user ? user : null;
  }

  async findByIdAllUsers(id: number): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({ where: { admin: false } });
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  createUser(user: UserEntity): Promise<UserEntity> {
    if (!user.id) {
      delete user.id;
    }
    return this.userRepository.save(user);
  }

  updateUser(user: UserEntity): Promise<UpdateResult> {
    return this.userRepository.update({ id: user.id }, user);
  }
}
