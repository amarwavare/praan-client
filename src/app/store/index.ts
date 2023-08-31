import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga";
import { praanSlice } from "./reducer";
import watcherSaga from "./saga";

// const SagaMiddleware = createSagaMiddleware(configureStore.reducer);

const sagaMiddleware = createSagaMiddleware()

// export default configureStore({
//     reducer:{
//         praanReducer: praanSlice.reducer,
//     },
//     middleware: [SagaMiddleware]
// })

export const store = configureStore({
    reducer: {
        praanReducer: praanSlice.reducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(watcherSaga);

