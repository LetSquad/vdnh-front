declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            DEBUG?: boolean;
            MAPBOX_KEY: string;
            EXTERNAL_URL?: string;
        }
    }
}

export {};
