import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchFlightsInfo() {
    const json = yield fetch('https://tokigames-challenge.herokuapp.com/api/flights/cheap')
                .then(res => res.json())
    yield put({type: "NEWS_RECEIVED", json: json.data})
}

function* actionWatcher() {
    yield takeLatest('GET_NEWS', fetchFlightsInfo)
}

export default  function* rootSaga(){
    yield all([actionWatcher()])
}