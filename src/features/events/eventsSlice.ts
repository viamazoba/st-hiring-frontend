import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Ticket {
    id: number;
    type: string;
    price: number;
    status: string;
}

export interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
    availableTickets: Ticket[];
}

export interface EventsState {
    events: Event[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: EventsState = {
    events: [],
    status: 'idle',
    error: null,
};

export const fetchEvents = createAsyncThunk<Event[], void, { rejectValue: string }>(
    'events/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Event[]>('http://localhost:3000/events');
            return response.data;

        } catch (error) {

            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message || 'Conexion error with server');
            }

            return rejectWithValue('Unknown Error');
        }
    }
);


const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default eventsSlice.reducer;