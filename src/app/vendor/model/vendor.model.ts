export interface IVendor {
  _id?: string;
  username: string;
  password: string;
  companyName: string;
  email: string;
  phone: string;
}

export interface IVendorSignupResponse {
  success: boolean;
  message: string;
}

export interface IVendorSignInResponse {
  success: boolean;
  message: string;
  token: string;
}