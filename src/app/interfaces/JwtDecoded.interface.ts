export interface JwtDecoded {
    exp: number;
    iat: number;
    username: string;
    sub: string;
}
