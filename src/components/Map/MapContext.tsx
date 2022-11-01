import { createContext, useContext } from "react";

import { Map } from "mapbox-gl";

type MapContextType = {
    map?: Map;
};

export const MapContext = createContext<MapContextType | undefined>(undefined);

export function useMap() {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useMap must be used within a MapProvider");
    }
    return context.map;
}
