export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  office?: IOffice;
  birthDate?: Date | null;
  mobile?: string;
  admin?: boolean;
  tags?: ITag[];
}

export interface IUserForm {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  office?: number;
  birthDate?: Date | null;
  mobile?: string;
  admin?: boolean;
  tags?: number[];
}

export interface IOffice {
  id: string;
  name: string;
}

export interface ITag {
  id: string;
  text: string;
}
