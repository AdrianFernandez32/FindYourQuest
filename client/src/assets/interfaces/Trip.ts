export interface ITrip {
  id?: number;
  start_date: Date;
  end_date: Date;
  budget: number;
  flight_in_id: number;
  flight_out_id: number;
  hotel_id: number;
  city_id: string;
}

export const defaultTrip: ITrip = {
  start_date: new Date(),
  end_date: new Date(),
  budget: 0,
  flight_in_id: 0,
  flight_out_id: 0,
  hotel_id: 0,
  city_id: "",
};
