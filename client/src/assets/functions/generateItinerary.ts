import { EventApi } from "@fullcalendar/core";

const longActivities = new Set([
  "museum",
  "stadium",
  "zoo",
  "amusement_park",
  "campground",
]);
const midActivities = new Set([
  "art_gallery",
  "aquarium",
  "shopping_mall",
  "tourist_attraction",
  "church",
]);
const shortActivities = new Set(["movie_theater"]);

const activities = [
  "movie_theater",
  "art_gallery",
  "aquarium",
  "shopping_mall",
  "tourist_attraction",
  "church",
  "museum",
  "stadium",
  "zoo",
  "amusement_park",
  "campground",
];

var visitedPlaces: string[] = [];

const getPlaceToVisit = () => {};

const getRestaurantToVisit = () => {};

const activityByHour = (hour: number) => {
  if (hour >= 0 && hour < 10) {
    return null;
  } else if (hour >= 10 && hour < 12) {
    return "restaurants";
  } else {
    return activities[Math.floor(Math.random() * activities.length)];
  }
};

const timeByActivity = (act: string) => {
  if (act in longActivities) return 4;
  else if (act in midActivities) return 3;
  else return 2;
};

const generateItinerary = (
  events: EventApi[],
  startDate: string,
  endDate: string
) => {
  const currentDate = new Date(startDate);
  const end_date = new Date(endDate);

  while (currentDate < end_date) {
    const currHour = currentDate.getHours();
    const act = activityByHour(currHour);
    if (!act) {
      currentDate.setHours(currentDate.getHours() + 1);
    } else if (act === "resturants") {
      currentDate.setMinutes(currentDate.getMinutes() + 90);
    } else {
      const timeSpent = timeByActivity(act);
      currentDate.setMinutes(currentDate.getMinutes() + timeSpent);
    }
  }
};
