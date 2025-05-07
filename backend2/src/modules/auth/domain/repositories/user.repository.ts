import { User } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract getUsers(): Promise<User[]>;

  abstract createUser(user: User): Promise<User>;

  abstract updateUser(id: string, user: User): Promise<User>;

  abstract getUserById(id: string): Promise<User | null>;

  abstract getUserByEmail(email: string): Promise<User | null>;

  abstract loginUser(email: string, password: string): Promise<User | null>;

  abstract removeUser(id: string): Promise<User>;
}
