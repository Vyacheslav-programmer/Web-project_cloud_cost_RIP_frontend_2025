import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncThunkConfig, T_TariffCreate, T_TariffUpdate, T_TariffUpdateImage} from "modules/types"
import {api} from "modules/api.ts";
import {Tariff, Tariffs} from "src/api/Api.ts";

type T_TariffsSlice = {
    tariff_name: string
    tariff: Tariff | null;
    tariffs: Tariffs[]
}

const initialState:T_TariffsSlice = {
    tariff_name: "",
    tariff: null,
    tariffs: []
}

export const fetchTariffs = createAsyncThunk<Tariffs[], void, AsyncThunkConfig>(
    "fetch_tariffs",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.tariffs.tariffsList({
            tariff_name: state.tariffs.tariff_name
        })

        return response.data
    }
)

export const fetchTariff = createAsyncThunk<Tariff, string, AsyncThunkConfig>(
    "fetch_tariff",
    async function(id) {
        const response = await api.tariffs.tariffsRead(id)
        return response.data
    }
)


export const addTariffToForecast = createAsyncThunk<void, number, AsyncThunkConfig>(
    "tariffs/add_tariff_to_forecast",
    async function(tariff_id) {
        await api.tariffs.tariffsAddToForecastCreate(tariff_id.toString())
    }
)

export const deleteTariff = createAsyncThunk<Tariffs[], string, AsyncThunkConfig>(
    "delete_tariff",
    async function(tariff_id) {
        const response = await api.tariffs.tariffsDeleteDelete(tariff_id)
        return response.data
    }
)

export const updateTariff = createAsyncThunk<void, T_TariffUpdate, AsyncThunkConfig>(
    "update_tariff",
    async function({tariff_id, data}) {
        await api.tariffs.tariffsUpdateUpdate(tariff_id.toString(), data as Tariff)
    }
)

export const updateTariffImage = createAsyncThunk<void, T_TariffUpdateImage, AsyncThunkConfig>(
    "update_tariff_image",
    async function({tariff_id, data}) {
        await api.tariffs.tariffsUpdateImageCreate(tariff_id.toString(), data as {image?: File})
    }
)

export const createTariff = createAsyncThunk<void, T_TariffCreate, AsyncThunkConfig>(
    "update_tariff",
    async function(data) {
        await api.tariffs.tariffsCreateCreate(data)
    }
)

const tariffsSlice = createSlice({
    name: 'tariffs',
    initialState: initialState,
    reducers: {
        updateTariffName: (state, action: PayloadAction<string>) => {
            state.tariff_name = action.payload
        },
        removeSelectedTariff: (state) => {
            state.tariff = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTariffs.fulfilled, (state, action: PayloadAction<Tariffs[]>) => {
            state.tariffs = action.payload
        });
        builder.addCase(fetchTariff.fulfilled, (state, action: PayloadAction<Tariff>) => {
            state.tariff = action.payload
        });
        builder.addCase(deleteTariff.fulfilled, (state:T_TariffsSlice, action: PayloadAction<Tariffs[]>) => {
            state.tariffs = action.payload
        });
    }
})

export const { updateTariffName, removeSelectedTariff} = tariffsSlice.actions;

export default tariffsSlice.reducer
