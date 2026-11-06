import {get, post} from "./controller.js";
import type { MockInitDataResponse } from "../../types/api.js";

export async function getInitData(): Promise<string> {
    const initData = window.Telegram?.WebApp?.initData;

    if (initData) return initData;

    if (import.meta.env.DEV) {
        const data = await get<MockInitDataResponse>("/api/dev/mock-init-data/");
        return data.initData;
    }

    throw Error("Telegram initData is unavailable");
}

export async function authorizationByInitData(initData: string) {
    const response = await fetch("/api/auth/telegram",
        {
            headers: {"Authorization": `tma ${initData}`},
            method: "POST"
        }
    );
    if (!response.ok) return false;
    return true;
}