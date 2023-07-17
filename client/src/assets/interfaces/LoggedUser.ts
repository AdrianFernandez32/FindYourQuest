export interface ILoggedUser {
  email: string;
  first_name: string;
  iat: number;
  id: number;
  last_name: string;
  trips: number | null;
}
