import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { LanguagesEnum } from '@prisma/client';
import UserEntity from '../entities/user.entity';

export class UpdateUserDto extends PartialType(UserEntity) {
  @ApiPropertyOptional({ type: String, maxLength: 18 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  declare readonly phone?: string | null;

  @ApiPropertyOptional({ type: String, maxLength: 18, nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  declare readonly firstName?: string | null;

  @ApiPropertyOptional({ type: String, maxLength: 18, nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  declare readonly lastName?: string;

  @ApiPropertyOptional({
    type: String,
    example: LanguagesEnum.EN,
    enum: LanguagesEnum,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(LanguagesEnum)
  declare readonly language?: LanguagesEnum;
}
