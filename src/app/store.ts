import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../features/events/eventsSlice';
import settingsReducer from '../features/settings/settingsSlice';
import type { EventsState } from '../features/events/eventsSlice'
import type { SettingsState } from '../features/settings/settingsSlice'

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        settings: settingsReducer,
    },
});

export type RootState = {
    events: EventsState,
    settings: SettingsState
}

export type AppDispatch = typeof store.dispatch;