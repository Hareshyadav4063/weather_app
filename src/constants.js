export const weatherCodes={
  clear: [1000], // Sunny / Clear

  clouds: [1003, 1006, 1009], 
  // 1003: Partly Cloudy, 1006: Cloudy, 1009: Overcast

  mist: [1030, 1135, 1147], 
  // 1030: Mist, 1135: Fog, 1147: Freezing Fog

  rain: [1063, 1150, 1153, 1180, 1183], 
  // Patchy rain, Light rain, Moderate rain at times, Light rain showers, Moderate rain showers

  moderate_heavy_rain: [1186, 1189, 1192, 1195], 
  // Heavy rain at times, Heavy rain showers, Torrential rain showers, Moderate or heavy rain

  snow: [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225], 
  // Patchy snow, Blowing snow, Blizzard, Light/Moderate/Heavy snow

  thunder: [1087], 
  // Thundery outbreaks possible

  thunder_rain: [1273, 1276, 1279, 1282] 
}