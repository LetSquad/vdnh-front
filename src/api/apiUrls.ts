const externalUrl = process.env.EXTERNAL_URL || "http://localhost:8080";
const baseUrl = `${externalUrl}`;
const mapUrl = `${baseUrl}/map`;
const routesUrl = `${baseUrl}/route`;

export const mapPointsUrl = `${mapUrl}/data`;

export const routeUrl = `${routesUrl}/navigate`;

export const trafficUrl = `${mapUrl}/heatmap`;
