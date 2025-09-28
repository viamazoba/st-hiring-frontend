import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../features/events/eventsSlice';
import type { EventsState } from '../features/events/eventsSlice'

export const store = configureStore({
    reducer: {
        events: eventsReducer,
    },
});

export type RootState = {
    events: EventsState
}

export type AppDispatch = typeof store.dispatch;