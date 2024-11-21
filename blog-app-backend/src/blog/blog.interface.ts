export interface BlogDetails {
  id: number;
  title: string;
  content: string;
  userName?: string;
  profilePicture?: string;
}

export interface UserDetails {
  name: string;
  profilePicture?: string | null;
  email: string;
}

export interface BlogDetailsWithUser {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: UserDetails
}
