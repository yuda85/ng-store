export interface IUser {
  email: string;
  password: string;
  role: RolesEnum;
}

export enum RolesEnum {
  Admin = 'admin',
  User = 'user',
}
