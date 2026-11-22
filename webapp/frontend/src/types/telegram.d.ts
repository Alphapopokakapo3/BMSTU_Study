export {};

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                initData: string,
                colorScheme: string = "light",
                expand: () => void,
                onEvent: (event: string, func: () => void) => void
            };
        };
    }
}