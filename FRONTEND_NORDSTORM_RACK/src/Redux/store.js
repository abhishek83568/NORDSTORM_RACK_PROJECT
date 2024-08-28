import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { trendingReducer } from './reducers'

const rootReducers=combineReducers({
    trending:trendingReducer
})

export const store=legacy_createStore(rootReducers,applyMiddleware(thunk))

