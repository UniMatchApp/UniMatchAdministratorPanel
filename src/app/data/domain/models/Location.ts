export class Location {
  constructor(
    public latitude: number,
    public longitude: number,
    public altitude?: number
  ) {
  }

  public toString(): string {
    return `Lat: ${this.latitude}, Lon: ${this.longitude}, Alt: ${this.altitude ?? 'N/A'}`;
  }

  public static stringToLocation(location: string): Location {
    const locationArray = location.split(', ');
    const latitude = Number(locationArray[0].split(': ')[1]);
    const longitude = Number(locationArray[1].split(': ')[1]);
    const altitude = locationArray[2].split(': ')[1] === 'N/A' ? undefined : Number(locationArray[2].split(': ')[1]);
    return new Location(latitude, longitude, altitude);
  }
}
