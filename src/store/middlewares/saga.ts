import { all } from "redux-saga/effects";

const rootSaga = (listSagas: any[] = []) => function* () {
  yield all([
    ...listSagas,
  ]);
};

export default rootSaga;
