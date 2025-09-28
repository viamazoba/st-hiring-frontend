import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IDeliveryMethod {
    name: string;
    enum: string;
    order: number;
    isDefault: boolean;
    selected: boolean;
}

export interface ISettings {
    _id?: string;
    clientId: number;
    deliveryMethods: IDeliveryMethod[];
    fulfillmentFormat: { rfid: boolean; print: boolean; };
    printer: { id: string | null; };
    printingFormat: { formatA: boolean; formatB: boolean; };
    scanning: { scanManually: boolean; scanWhenComplete: boolean; };
    paymentMethods: { cash: boolean; creditCard: boolean; comp: boolean; };
    ticketDisplay: { leftInAllotment: boolean; soldOut: boolean; };
    customerInfo: { active: boolean; basicInfo: boolean; addressInfo: boolean; };
}

export interface SettingsState {
    settings: ISettings | null;
    isModalOpen: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SettingsState = {
    settings: null,
    isModalOpen: false,
    status: 'idle',
    error: null,
};


const API_URL = 'http://localhost:3000/api/v1/settings/1';

export const fetchSettings = createAsyncThunk<ISettings, void, object>('settings/fetchSettings', async () => {
    const response = await axios.get(API_URL);
    return response.data as ISettings;
});

export const updateSettings = createAsyncThunk<ISettings, ISettings, object>('settings/updateSettings', async (settings: ISettings) => {
    const response = await axios.put(API_URL, settings);
    return response.data as ISettings;
});


const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        openSettingsModal: (state) => {
            state.isModalOpen = true;
        },
        closeSettingsModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSettings.fulfilled, (state, action: PayloadAction<ISettings>) => {
                state.status = 'succeeded';
                state.settings = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch settings';
            })
            // Update Settings
            .addCase(updateSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSettings.fulfilled, (state, action: PayloadAction<ISettings>) => {
                state.status = 'succeeded';
                state.settings = action.payload;
                state.isModalOpen = false;
            })
            .addCase(updateSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update settings';
            });
    },
});

export const { openSettingsModal, closeSettingsModal } = settingsSlice.actions;
export default settingsSlice.reducer;