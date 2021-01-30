import { getWeather } from "../../../weather";

export default {
  Query: {
        weather: (_, arg) => {
          const { latitude, longitude } = arg; 
          return getWeather(latitude, longitude);
        },
  }
};