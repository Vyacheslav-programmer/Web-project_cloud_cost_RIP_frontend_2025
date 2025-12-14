import {AppDispatch, RootState} from "store/store.ts";
import {Tariff} from "src/api/Api.ts";

export interface AsyncThunkConfig {
    state: RootState;
    dispatch: AppDispatch;
}

export type T_ForecastsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
    owner: string
}

export type T_CartDataResponse = {
    tariffs_count: number,
    draft_forecast: number
}

export type T_TariffMMUpdate = {
    tariff_id: number,
    count: number
}

export type T_TariffUpdate = {
    tariff_id: number,
    data: Partial<Tariff>
}

export type T_TariffUpdateImage = {
    tariff_id: number,
    data: FormData
}

export type T_TariffCreate = {
    name: string;
    description: string;
    price: number;
    image?: File | null;
}

export enum E_ForecastStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}
