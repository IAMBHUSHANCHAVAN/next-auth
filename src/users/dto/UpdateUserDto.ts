import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserAddressDto } from './userAddressDto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;
  @IsOptional()
  @IsString()
  lastName?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsOptional()
  password?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => UserAddressDto)
  address?: UserAddressDto;
}
