const externalUrl = process.env.EXTERNAL_URL || "http://localhost:8080";
const baseUrl = `${externalUrl}`;
const mapUrl = `${baseUrl}/map`;

export const mapPointsUrl = `${mapUrl}/data`;

export const routeUrl = `${mapUrl}/fast`;

export const trafficUrl = `${mapUrl}/heatmap`;
