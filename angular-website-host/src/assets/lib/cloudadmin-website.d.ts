import { CloudAdminConfig } from './types';
export declare const CloudAdminWebsite: (config: CloudAdminConfig) => {
    createWebsite: () => Promise<void>;
    getAvailablePages: () => Promise<import("./types").CloudAdminPage[]>;
    setRoute: (route: string) => Promise<void>;
};
