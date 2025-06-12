import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { authActions } from "../../application/actions/auth-actions";
import { store } from "../../application/reducer/root";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "";

const requestLogout = async (dispatch: any) => {
  try {
    dispatch(authActions.onAuthChange(false));
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("refreshToken");
  } catch (e) {
    console.log(e);
  }
};

const checkAuthorization = async (url: string, dispatch: any) => {
  if (url === "/user/login") return;
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  try {
    const { data } = await axios.post(BASE_URL + "/user/refresh", {
      refreshToken,
    });

    await AsyncStorage.setItem("authToken", "Bearer " + data.authToken);
    dispatch(authActions.onAuthChange(true));
  } catch (error: any) {
    const isError = axios.isAxiosError(error);
    if (!isError) return;

    const response = error.response;
    if (!response) return;

    if (response.status === 401) {
      const data = response.data;
      const message = data.message;

      console.error(message);
      await requestLogout(dispatch);
    }
  }
};

export const makePostRequest = async (url: string, data: any) => {
  const dispatch = store.dispatch;

  console.info("Request Start");
  console.info("Endpoint: ", BASE_URL + url);
  console.info("Method: ", "POST");
  console.info("Body: ", data);
  console.info("Time: ", moment().format("HH:mm:ss"));
  console.info(" ");

  try {
    await checkAuthorization(url, dispatch);
    const authToken = await AsyncStorage.getItem("authToken");

    console.info("Authorization: ", { authorization: authToken ?? "" });

    const response = await axios.post(BASE_URL + url, data, {
      headers: { authorization: authToken ?? "" },
    });

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
