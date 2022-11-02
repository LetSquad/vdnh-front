declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MAPBOX_KEY: string;
            EXTERNAL_URL?: string;
        }
    }
}

export {};
