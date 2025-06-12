import { all, takeEvery } from "redux-saga/effects";
import { logoutSaga } from "./auth";

export default function* rootSaga() {
  yield all([takeEvery("LOGOUT_REQUEST", logoutSaga)]);
}
