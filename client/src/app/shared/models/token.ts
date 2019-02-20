export interface TokenResponse {
    token: string;
    data: object;
}

export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
    access?: string;
    cityId?: string;
    locationId?: object;
    subLocations?: object;
    phone?: string;
    favourites?: Array<number>;
}