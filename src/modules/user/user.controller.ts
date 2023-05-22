import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import ApiBaseResponses from '@decorators/api-base-response.decorator';
import {
  AccessGuard,
  Actions,
  CaslUser,
  UseAbility,
  UserProxy,
} from '@modules/casl';
import UserEntity from '@modules/user/entities/user.entity';
import Serialize from '@decorators/serialize.decorator';
import { OrderByPipe, WherePipe } from '@nodeteam/nestjs-pipes';
import { Prisma, User } from '@prisma/client';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import UserBaseEntity from '@modules/user/entities/user-base.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@ApiBaseResponses()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ name: 'where', required: false, type: 'string' })
  @ApiQuery({ name: 'orderBy', required: false, type: 'string' })
  @UseGuards(AccessGuard)
  @Serialize(UserBaseEntity)
  @UseAbility(Actions.read, UserEntity)
  async findAll(
    @Query('where', WherePipe) where?: Prisma.UserWhereInput,
    @Query('orderBy', OrderByPipe)
    orderBy?: Prisma.UserOrderByWithRelationInput,
  ): Promise<PaginatorTypes.PaginatedResult<User>> {
    return this.userService.findAll(where, orderBy);
  }

  @Get('me')
  @UseGuards(AccessGuard)
  @Serialize(UserBaseEntity)
  @UseAbility(Actions.read, UserEntity)
  async find(@CaslUser() userProxy?: UserProxy<User>): Promise<User> {
    const tokenUser = await userProxy.get();

    return this.userService.findOne(tokenUser.userId);
  }

  @Patch()
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AccessGuard)
  @Serialize(UserBaseEntity)
  @UseAbility(Actions.update, UserEntity)
  async update(
    @Body() data: UpdateUserDto,
    @CaslUser() userProxy: UserProxy<User>,
  ) {
    const { userId } = await userProxy.get();

    return this.userService.updateOne(userId, data);
  }

  @Patch(':userId')
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'userId', required: false, type: 'string' })
  @UseGuards(AccessGuard)
  @Serialize(UserBaseEntity)
  @UseAbility(Actions.update, UserEntity)
  async updateById(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() data: UpdateUserDto,
    @CaslUser() userProxy: UserProxy<User>,
  ) {
    const tokenUser = await userProxy.get();

    return this.userService.updateOne(userId, data);
  }
}
