export interface IAdmin {
  _id?: string;
  email: string;
  password: string;

}



export interface IAdminSignInResponse {
  success: boolean;
  message: string;
  token: string;
}
