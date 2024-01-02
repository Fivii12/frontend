//store.ts
import { combineReducers, createStore } from 'redux';
import appReducer from './redusers';

const rootReducer = combineReducers({
    app: appReducer,
});

const store = createStore(rootReducer);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };