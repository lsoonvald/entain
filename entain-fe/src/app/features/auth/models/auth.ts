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

export interface IOffice {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  text: string;
}
