export interface DecodedJWT {
  id: string;
  role: string;
  iat: number;
  exp: number;
}
