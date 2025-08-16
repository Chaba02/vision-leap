import axios from "axios";

async function getPrayerTimes(date: string, lat: number, lon: number) {
  const baseUrl = "https://api.aladhan.com/v1/timings";

  try {
    const response = await axios.get(`${baseUrl}/${date}`, {
      params: {
        latitude: lat,
        longitude: lon,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    throw error;
  }
}