import { useAppSelector } from "@store/hooks";
import { selectAllRouteMapPoint } from "@store/routes/selectors";

export default function RouteInfo() {
    const mapPoints = useAppSelector(selectAllRouteMapPoint);

    return (
        <div>
            {mapPoints.map((mapPoint) => mapPoint.properties.localizedTitle)}
        </div>
    );
}
