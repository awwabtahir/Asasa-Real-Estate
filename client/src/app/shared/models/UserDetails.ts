export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
    access?: string;
    cityId?: string;
    locationId?: object;
    subLocations?: object;
    phone?: string;
  }