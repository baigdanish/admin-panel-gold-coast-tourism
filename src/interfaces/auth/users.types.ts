export interface IResponseUsers {
  data: IUsers[];
  success: boolean;
  message: any;
}

export interface IUsers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
