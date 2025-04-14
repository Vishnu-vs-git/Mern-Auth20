import{combineReducers, configureStore}from "@reduxjs/toolkit"
import userReducer from './user/userSlice'
import {persistedReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import persistStore from "redux-persist/es/persistStore"

const rootreducer=combineReducers({user:userReducer

})

const persistConfig={
  key:'root',
  version:1,
  storage
}
const persistedReducer=persistedReducer(persistConfig,rootreducer)

export const Store= configureStore({
  reducer:{persistedReducer},
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
})

export const persistor= persistStore(Store)