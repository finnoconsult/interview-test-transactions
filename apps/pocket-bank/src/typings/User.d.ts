export interface UserProps {
  username: string;
  password: string;
}
export interface CurrentUser {
  username: string | null;
  loggedIn: boolean;
  token?: string | null;
}
