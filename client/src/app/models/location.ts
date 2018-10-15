export interface location {
    _id?: number,
    cityId: string,
    location: string,
    subLocations: object,
    lat: number,
    lng: number,
    overlayData: {
        lat0: number,
        lng0: number,
        lat1: number,
        lng1: number,
        imgLoc: string,
    }
}