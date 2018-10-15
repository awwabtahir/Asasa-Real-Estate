export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
    access?: string;
    cityId?: string;
    locationId?: string;
    subLocations?: object;
}