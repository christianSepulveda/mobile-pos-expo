import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "";

export const makePostRequest = async (url: string, data: any) => {
  console.log(BASE_URL + url);
  console.log(data);

  try {
    const response = await axios.post(BASE_URL + url, data);
    return response;
  } catch (error) {
    console.error("Error making request:", error);
  }
};