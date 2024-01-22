import { IsOptional } from 'class-validator';

export class UserAddressDto {
  @IsOptional()
  country?: string;
  @IsOptional()
  postalCode?: string;
  @IsOptional()
  city?: string;
  @IsOptional()
  state?: string;
  @IsOptional()
  landmark?: string;
}
