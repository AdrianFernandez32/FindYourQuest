export interface IUser {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  salt?: string;
  trips: number;
}
