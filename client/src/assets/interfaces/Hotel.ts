export interface IHotel {
  id?: number;
  checkin: Date;
  checkout: Date;
  place_id: string;
}

export const defaultHotel: IHotel = {
  checkin: new Date(),
  checkout: new Date(),
  place_id: "",
};
