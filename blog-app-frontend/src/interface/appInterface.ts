export interface IBlogCreate {
  title: string;
  content: string;
}

export interface IBlogDetails {
  id: number;
  title: string;
  content: string;
  userName: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  profilePicture?: string;
  accessToken: string;
}

export interface IUserDetails {
  name: string;
  profilePicture?: string;
  email: string;
}

export interface IBlogDetailsWithUser {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: IUserDetails;
}
