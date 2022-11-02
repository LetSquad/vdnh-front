import React, {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import { Point } from "geojson";
import mapboxgl, {
    LngLatBounds,
    Map as MapboxMap,
    MapboxEvent,
    MapMouseEvent,
    Popup
} from "mapbox-gl";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import basePartStyles from "@coreStyles/baseParts.module.scss";
import { MapPointCategory } from "@models/mapPoints/enums";
import { MapPointFeature } from "@models/mapPoints/types";
import { BaseRoutesSlugs } from "@models/routes/enums";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getMapPointsRequest, setMapPointActive, setMapPointsUnActive } from "@store/mapPoints/reducer";
import {
    selectCurrentMapPoint,
    selectIsMapPointsInitialState,
    selectIsMapPointsLoading,
    selectIsMapPointsLoadingFailed
} from "@store/mapPoints/selectors";

import { MapContext } from "./MapContext";
import styles from "./styles/Map.module.scss";

const CONTAINER_ID = "map-container";

interface MapProps {
    mapPoints: MapPointFeature[];
    children?: JSX.Element | JSX.Element[]
}

export default function Map({ mapPoints, children }: MapProps) {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("map");

    const navigate = useNavigate();
    const location = useLocation();

    const isPlacesInitialState = useAppSelector(selectIsMapPointsInitialState);
    const isPlacesLoading = useAppSelector(selectIsMapPointsLoading);
    const isPlacesLoadingLoadingFailed = useAppSelector(selectIsMapPointsLoadingFailed);
    const currentPlace = useAppSelector(selectCurrentMapPoint);

    const [map, setMap] = useState<MapboxMap>();

    const mapContextValue = useMemo(
        () => ({
            map
        }),
        [map]
    );

    const addDataToMap = useCallback(({ target: _map }: MapboxEvent) => {
        _map
            .addSource("places", { type: "geojson", data: { type: "FeatureCollection", features: mapPoints } })
            .addSource(
                "route",
                {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: []
                        }
                    }
                }
            )
            .addLayer({
                id: "places-dots",
                type: "circle",
                source: "places",
                paint: {
                    "circle-translate": [0, -10],
                    "circle-radius": [
                        "interpolate", ["linear"], ["zoom"],
                        13, 2,
                        15, 5
                    ],
                    "circle-color": ["get", "color"],
                    "circle-stroke-color": "#ffffff",
                    "circle-stroke-width": 1
                },
                filter: [
                    "all",
                    ["==", ["get", "isVisible"], true],
                    ["!=", ["get", "active"], true]
                ]
            })
            .addLayer({
                id: "places",
                type: "symbol",
                source: "places",
                paint: {
                    "text-color": "#262626",
                    "text-halo-color": "#ffffff",
                    "text-halo-width": 1
                },
                layout: {
                    "icon-allow-overlap": false,
                    "text-allow-overlap": false,
                    "icon-image": "{icon}",
                    "text-field": "{localizedShortTitle}",
                    "text-size": 13,
                    "text-anchor": "top",
                    "icon-anchor": "bottom",
                    "text-offset": [
                        0, 0
                    ],
                    "text-font": [
                        "Suisse-Intl-Book"
                    ]
                },
                filter: [
                    "!=", ["get", "active"], true
                ]
            })
            .addLayer({
                id: "places-active",
                type: "symbol",
                source: "places",
                paint: {
                    "text-color": "#262626",
                    "text-halo-color": "#ffffff",
                    "text-halo-width": 1
                },
                layout: {
                    "icon-allow-overlap": true,
                    "text-allow-overlap": true,
                    "icon-image": "{icon}-active",
                    "text-field": "{localizedShortTitle}",
                    "text-size": 13,
                    "text-anchor": "top",
                    "icon-anchor": "bottom",
                    "text-font": [
                        "Suisse-Intl-Book"
                    ]
                },
                filter: [
                    "==", ["get", "active"], true
                ]
            })
            .addLayer({
                id: "route",
                type: "line",
                source: "route",
                layout: {
                    "line-join": "round",
                    "line-cap": "round"
                },
                paint: {
                    "line-color": "#3887be",
                    "line-width": 5,
                    "line-opacity": 0.75
                }
            });

        setMap(_map);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onMapClick = useCallback((event: MapMouseEvent) => {
        const features = event.target.queryRenderedFeatures(
            event.point,
            { layers: ["places", "places-dots"] }
        );

        if (features.length > 0 && features[0].id !== currentPlace?.id) {
            const newActivePlace = features[0];

            dispatch(setMapPointActive(newActivePlace.id));

            const { coordinates } = newActivePlace.geometry as Point;

            event.target.flyTo({
                center: [coordinates[0], coordinates[1]],
                zoom: 16
            });

            if (newActivePlace.properties) {
                navigate(newActivePlace.properties.url);
            }
        } else if (features.length === 0) {
            dispatch(setMapPointsUnActive());

            switch (true) {
                case location.pathname.startsWith(BaseRoutesSlugs.PLACES) && location.pathname !== BaseRoutesSlugs.PLACES: {
                    navigate(BaseRoutesSlugs.PLACES);
                    break;
                }
                case location.pathname.startsWith(BaseRoutesSlugs.ROUTES) && location.pathname !== BaseRoutesSlugs.ROUTES: {
                    navigate(BaseRoutesSlugs.ROUTES);
                    break;
                }
                case location.pathname.startsWith(BaseRoutesSlugs.EVENTS) && location.pathname !== BaseRoutesSlugs.EVENTS: {
                    navigate(BaseRoutesSlugs.EVENTS);
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }, [currentPlace?.id, dispatch, location.pathname, navigate]);

    const onMouseEnterPlace = useCallback((event: MapMouseEvent, popup: Popup) => {
        const features = event.target.queryRenderedFeatures(
            event.point,
            { layers: ["places", "places-dots"] }
        );

        if (features.length > 0) {
            const hoveredPlace = features[0];

            const { coordinates } = hoveredPlace.geometry as Point;

            event.target.getCanvas().style.cursor = "pointer";

            let html =
                `<div class="${styles.popupType}">${hoveredPlace.properties?.localizedType}</div>
                <div class="${styles.popupTitle}">${hoveredPlace.properties?.localizedTitle}</div>`;

            if (hoveredPlace.properties?.category === MapPointCategory.PLACE) {
                const events = JSON.parse(hoveredPlace.properties.events);

                if (events.length > 0) {
                    // eslint-disable-next-line unicorn/prefer-spread
                    html = html.concat("\n", `<div class="${styles.popupTime}">${t("map:events", { count: events.length })}</div>`);
                }
            }

            if (hoveredPlace.properties?.pic) {
                // eslint-disable-next-line unicorn/prefer-spread
                html = html.concat("\n", `<div class="${styles.popupPic}" style="background-image: url(" ${hoveredPlace.properties?.pic}")" />`);
            }

            popup
                .setHTML(html)
                .setLngLat([coordinates[0], coordinates[1]])
                .addTo(event.target);
        }
    }, [t]);

    const onMouseLeavePlace = useCallback((event: MapMouseEvent, popup: Popup) => {
        event.target.getCanvas().style.cursor = "";
        popup.remove();
    }, []);

    useEffect(() => {
        if (isPlacesInitialState) {
            dispatch(getMapPointsRequest());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!map) {
            mapboxgl.accessToken = process.env.MAPBOX_KEY;
            const _map = new MapboxMap({
                container: CONTAINER_ID,
                style: "https://vdnh.ru/gis/api/rpc/get_style?style_number=1",
                center: [37.624_13, 55.833_883],
                zoom: 14,
                maxBounds: new LngLatBounds([37.624_13 - 0.07, 55.833_883 - 0.04], [37.624_13 + 0.07, 55.833_883 + 0.04])
            });

            const popup = new Popup({
                closeButton: false,
                closeOnClick: false,
                closeOnMove: false
            });

            _map.on("load", addDataToMap);
            _map.on("click", onMapClick);
            _map.on("mouseenter", ["places", "places-dots"], (event) => onMouseEnterPlace(event, popup));
            _map.on("mouseleave", ["places", "places-dots"], (event) => onMouseLeavePlace(event, popup));
        }

        return () => map && map.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (map && currentPlace) {
            map.flyTo({
                center: [currentPlace.geometry.coordinates[0], currentPlace.geometry.coordinates[1]],
                zoom: 16
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    useEffect(() => {
        if (map) {
            const source = map.getSource("places");

            if (source && "setData" in source) {
                source.setData({ type: "FeatureCollection", features: mapPoints });
            }
        }
    }, [mapPoints, map]);

    if (isPlacesLoading) {
        return (
            <div className={basePartStyles.flexBaseCenterContainer}>
                <Loader
                    active
                    inline="centered"
                />
            </div>
        );
    }

    if (isPlacesLoadingLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText="информации о приеме"
                reload={getMapPointsRequest}
            />
        );
    }

    return (
        <div
            id={CONTAINER_ID}
            className={basePartStyles.baseContainer}
        >
            <MapContext.Provider value={mapContextValue}>
                {children}
            </MapContext.Provider>
        </div>
    );
}
