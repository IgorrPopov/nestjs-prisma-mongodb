import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/user/user.repository';
import { Prisma, User } from '@prisma/client';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @desc Find a user by id
   * @param userId
   * @returns Promise<User>
   */
  findOne(userId: string): Promise<User> {
    return this.userRepository.findOne({
      where: { userId },
    });
  }

  /**
   * @desc Find all users with pagination
   * @param where
   * @param orderBy
   */
  findAll(
    where: Prisma.UserWhereInput,
    orderBy: Prisma.UserOrderByWithRelationInput,
  ): Promise<PaginatorTypes.PaginatedResult<User>> {
    return this.userRepository.findAll(where, orderBy);
  }

  /**
   * @desc Update a user
   * @param data Prisma.UserUpdateInput
   * @returns Promise<User>
   */
  updateOne(userId: string, data: UpdateUserDto): Promise<User> {
    return this.userRepository.updateOne({ where: { userId }, data });
  }
}
