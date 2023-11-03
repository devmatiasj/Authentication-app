import { IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  profilePicture: any;
}

