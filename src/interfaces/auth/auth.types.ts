export default interface IUserstate {
  token: string;
  isLoggedIn: boolean;
}
export interface ILoginRequest {
  email: string | any;
  password: string;
}
