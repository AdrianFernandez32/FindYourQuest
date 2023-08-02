export interface ITrip {
  id?: number;
  start_date: Date | string;
  end_date: Date | string;
  flight_in_id: number;
  flight_out_id: number;
  hotel_id: number;
  city_id: string;
}

export const defaultTrip: ITrip = {
  start_date: new Date(),
  end_date: new Date(),
  flight_in_id: 0,
  flight_out_id: 0,
  hotel_id: 0,
  city_id: "",
};
