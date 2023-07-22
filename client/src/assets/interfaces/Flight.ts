export interface IFlight {
  id?: number;
  departure: Date;
  landing: Date;
  airline: string;
  departure_airport: string;
  landing_airport: string;
}

export const defaultFlight: IFlight = {
  departure: new Date(),
  landing: new Date(),
  airline: "",
  departure_airport: "",
  landing_airport: "",
};
