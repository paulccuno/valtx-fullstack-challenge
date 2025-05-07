import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends IUserRepository {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
    super();
  }

  async getUsers(): Promise<User[]> {
    return this.repo.find();
  }

  async createUser(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async updateUser(id: string, user: User): Promise<User> {
    return this.repo.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.repo.findOne({
      where: { id },
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.repo.findOne({
      where: { email },
    });

    return user;
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    const user = await this.repo.findOne({
      where: {
        email,
        password,
      },
    });

    return user;
  }

  async removeUser(id: string): Promise<User> {
    return this.repo.save({ id, recordStatus: false });
  }
}
