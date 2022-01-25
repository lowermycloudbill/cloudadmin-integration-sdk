export declare type CloudAdminConfig = {
    cloudAdminWebsiteUrl: string;
    websiteContainerId?: string;
    cloudAdminApiUrl: string;
    clientId: string;
    clientEmail: string;
    partner: string;
    debugMode?: boolean;
};
export declare type CloudAdminPage = {
    title: string;
    route: string;
    group: string;
};
export declare type CloudAdminIframeApi = {
    getAvailablePages(partner: string): CloudAdminPage[];
    setRoute(route: string): any;
};
