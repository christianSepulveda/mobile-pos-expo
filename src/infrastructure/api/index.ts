import axios from "axios";
import moment from "moment";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "";

export const makePostRequest = async (url: string, data: any) => {
  console.info("Request Start");
  console.info("Endpoint: ", BASE_URL + url);
  console.info("Method: ", "POST");
  console.info("Body: ", data);
  console.info("Time: ", moment().format("HH:mm:ss"));
  console.info(" ");

  try {
    const response = await axios.post(BASE_URL + url, data);

    console.info(" ");
    console.info("Response: ", response.data);
    console.info("Status: ", response.status);
    console.info("Request End");
    console.info(" ");

    return response.data;
  } catch (e) {
    const error = e as any;

    if (error.response) {
      console.info(" ");
      console.info("Request Response with an error");
      console.info("Error :", error.response.data.message);
      console.info(" ");

      return error.response.data;
    }

    console.log(e);
  }
};
