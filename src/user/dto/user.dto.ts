export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  name: string;
  imgUrl: string;
}
export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  imgUrl?: string;
}
