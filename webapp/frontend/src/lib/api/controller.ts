export const API_PATH = import.meta.env.VITE_API_BASE_URL;

export async function get<T>(path: string): Promise<T> {
    const response = await fetch(`${API_PATH}${path}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json() as T;
}


export async function post<T>(path: string): Promise<T> {
    const response = await fetch(`${API_PATH}${path}`, {
        method: 'POST'
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json() as T;
}

