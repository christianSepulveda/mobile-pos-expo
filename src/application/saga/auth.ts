import { put } from "redux-saga/effects";
import { authActions } from "../actions/auth-actions";

export function* logoutSaga(): Generator {
  yield put(authActions.onAuthChange(false));
}
