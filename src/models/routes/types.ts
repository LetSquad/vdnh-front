import * as React from "react";

interface PageDataContent {
    localizeNameKey: string;
    defaultName: string;
    slug: string;
}

interface PageComponentsContent {
    component: React.ComponentType;
}

export type Page = Record<string, PageDataContent & PageComponentsContent>;
