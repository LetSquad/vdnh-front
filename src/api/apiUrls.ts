const externalUrl = process.env.EXTERNAL_URL || "https://localhost:8443";
const baseUrl = `${externalUrl}`;

export const mapPointsUrl = `${baseUrl}/map/data`;

export const routeUrl = `${baseUrl}/route`;
