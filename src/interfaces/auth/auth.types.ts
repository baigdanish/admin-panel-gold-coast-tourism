export default interface IUserstate {
  token: string;
  isLoggedIn: boolean;
}
export interface ILoginRequest {
  phone: string | any;
  password: string;
}
