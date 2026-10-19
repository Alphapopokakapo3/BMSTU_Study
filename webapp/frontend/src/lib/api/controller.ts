const API_PATH = "http://127.0.0.1:5000/";

export async function get<T>(path: string): Promise<T> {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json() as T;
}

