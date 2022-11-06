import React, {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import classNames from "classnames";
import { Point } from "geojson";
import mapboxgl, {
    LngLatBounds,
    Map as MapboxMap,
    MapboxEvent,
    MapMouseEvent,
    Marker
} from "mapbox-gl";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import basePartStyles from "@coreStyles/baseParts.module.scss";
import { MapPointCategory } from "@models/mapPoints/enums";
import { MapPointFeature } from "@models/mapPoints/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import arrow from "@static/images/png/arrow.png";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getMapPointsRequest, setMapPointActive, setMapPointsUnActive } from "@store/mapPoints/reducer";
import {
    selectCurrentMapPoint,
    selectIsMapPointsInitialState,
    selectIsMapPointsLoading,
    selectIsMapPointsLoadingFailed
} from "@store/mapPoints/selectors";
import { getTrafficRequest, resetTraffic } from "@store/traffic/reducer";
import { selectIsTrafficLoading, selectTraffic } from "@store/traffic/selectors";

import { MapContext } from "./MapContext";
import styles from "./styles/Map.module.scss";

const CONTAINER_ID = "map-container";

interface MapProps {
    mapPoints: MapPointFeature[];
    children?: JSX.Element | JSX.Element[]
}

export default function Map({ mapPoints, children }: MapProps) {
    const dispatch = useAppDispatch();

    const isMobile = useMediaQuery({ maxWidth: 1249 });

    const { t } = useTranslation("map");

    const [searchParams, setSearchParams] = useSearchParams();

    const isPlacesInitialState = useAppSelector(selectIsMapPointsInitialState);
    const isPlacesLoading = useAppSelector(selectIsMapPointsLoading);
    const isPlacesLoadingLoadingFailed = useAppSelector(selectIsMapPointsLoadingFailed);
    const currentPlace = useAppSelector(selectCurrentMapPoint);

    const traffic = useAppSelector(selectTraffic);
    const isTrafficLoading = useAppSelector(selectIsTrafficLoading);

    const [map, setMap] = useState<MapboxMap>();

    const mapContextValue = useMemo(
        () => ({
            map
        }),
        [map]
    );

    const getPoints = useCallback(() => {
        dispatch(getMapPointsRequest());
    }, [dispatch]);

    const onTrafficButtonClick = useCallback(() => {
        if (!traffic) {
            dispatch(getTrafficRequest());
        } else {
            dispatch(resetTraffic());
        }
    }, [dispatch, traffic]);

    const addDataToMap = useCallback(({ target: _map }: MapboxEvent) => {
        _map
            .addSource("places", { type: "geojson", data: { type: "FeatureCollection", features: mapPoints } })
            .addSource("traffic", { type: "geojson", data: { type: "FeatureCollection", features: traffic || [] } })
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
                    "line-color": "#e22c38",
                    "line-width": 3,
                    "line-opacity": 0.65,
                    "line-dasharray": [2, 3]
                }
            })
            .addLayer({
                id: "traffic",
                type: "heatmap",
                source: "traffic",
                minzoom: isMobile ? 13 : 14,
                maxzoom: 20,
                paint: {
                    "heatmap-weight": [
                        "interpolate", ["linear"], ["get", "loadFactor"],
                        0.01, 1,
                        1, 100
                    ],
                    "heatmap-intensity": [
                        "interpolate", ["linear"], ["zoom"],
                        13, 0,
                        20, 0.5
                    ],
                    "heatmap-color": [
                        "interpolate", ["linear"], ["heatmap-density"],
                        0, "rgba(0,0,0,0)",
                        0.1, "rgb(0,255,0)",
                        0.3, "rgb(150,207,103)",
                        0.5, "rgb(221,231,0)",
                        0.7, "rgb(241,119,52)",
                        0.9, "rgb(246,81,18)",
                        1, "rgb(255,0,0)"
                    ],
                    "heatmap-radius": [
                        "interpolate", ["linear"], ["zoom"],
                        13, isMobile ? 30 : 50,
                        20, isMobile ? 60 : 100
                    ],
                    "heatmap-opacity": [
                        "interpolate", ["linear"], ["zoom"],
                        13, 0.5,
                        20, 0.9
                    ]
                }
            });

        _map.loadImage(arrow, (error, result) => {
            if (result) {
                _map.addImage("arrow", result);

                _map.addLayer({
                    id: "directions",
                    type: "symbol",
                    source: "route",
                    paint: {},
                    layout: {
                        "symbol-placement": "line",
                        "icon-image": "arrow",
                        "icon-rotation-alignment": "map",
                        "icon-allow-overlap": true,
                        "icon-ignore-placement": true,
                        "symbol-spacing": 50
                    }
                });
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
                searchParams.set(newActivePlace.properties.category.toLowerCase(), newActivePlace.id as string);
                setSearchParams(searchParams);
            }
        } else if (features.length === 0) {
            dispatch(setMapPointsUnActive());

            for (const key of searchParams.keys()) {
                searchParams.delete(key);
            }

            setSearchParams(searchParams);
        }
    }, [currentPlace?.id, dispatch, searchParams, setSearchParams]);

    const onMouseMove = useCallback((event: MapMouseEvent, popup: Marker, element: HTMLDivElement) => {
        if (!event.target.loaded()) {
            return;
        }

        const features = event.target.queryRenderedFeatures(
            event.point,
            { layers: ["places", "places-dots"] }
        );

        if (features.length > 0) {
            const hoveredPlace = features[0];

            const { coordinates } = hoveredPlace.geometry as Point;

            event.target.getCanvas().style.cursor = "pointer";

            let html =
                `<div class="${styles.popup}">
                <div class="${styles.popupType}">${hoveredPlace.properties?.localizedType}</div>
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
                html = html.concat("\n", `<div class="${styles.popupPic}" style="background-image: url('${hoveredPlace.properties?.pic}')" />`);
            }

            // eslint-disable-next-line unicorn/prefer-spread
            html = html.concat("\n", "</div>");

            element.innerHTML = html;

            popup
                .setLngLat([coordinates[0], coordinates[1]])
                .addTo(event.target);
        } else {
            event.target.getCanvas().style.cursor = "";
            element.innerHTML = "";
            popup.remove();
        }
    }, [t]);

    useEffect(() => {
        if (isPlacesInitialState) {
            getPoints();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!map && !isPlacesInitialState && !isPlacesLoading && !isPlacesLoadingLoadingFailed) {
            mapboxgl.accessToken = process.env.MAPBOX_KEY;
            const _map = new MapboxMap({
                container: CONTAINER_ID,
                style: "https://vdnh.ru/gis/api/rpc/get_style?style_number=1",
                center: [37.624_13, 55.833_883],
                zoom: 14,
                minZoom: isMobile ? 13 : 14,
                maxZoom: 20,
                maxBounds: new LngLatBounds([37.624_13 - 0.07, 55.833_883 - 0.04], [37.624_13 + 0.07, 55.833_883 + 0.04])
            });

            const element = document.createElement("div");
            const popup = new Marker({ element });

            _map.on("load", addDataToMap);
            _map.on("click", onMapClick);
            _map.on("mousemove", (event) => onMouseMove(event, popup, element));
        }

        return () => map && map.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlacesInitialState, isPlacesLoading, isPlacesLoadingLoadingFailed]);

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

    useEffect(() => {
        if (map) {
            const source = map.getSource("traffic");

            if (source && "setData" in source) {
                source.setData({ type: "FeatureCollection", features: traffic || [] });
            }
        }
    }, [traffic, map]);

    if (isPlacesLoading || isPlacesInitialState) {
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
                isLoadingErrorObjectText={t("map:loadingError")}
                reload={getPoints}
            />
        );
    }

    return (
        <div
            id={CONTAINER_ID}
            className={basePartStyles.baseContainer}
        >
            <PrimaryButton
                className={classNames(styles.trafficButton, { [styles.trafficButtonUnactive]: !traffic })}
                disabled={isTrafficLoading}
                loading={isTrafficLoading}
                onClick={onTrafficButtonClick}
            >
                {t("map:trafficControl")}
            </PrimaryButton>
            <MapContext.Provider value={mapContextValue}>
                {children}
            </MapContext.Provider>
        </div>
    );
}
