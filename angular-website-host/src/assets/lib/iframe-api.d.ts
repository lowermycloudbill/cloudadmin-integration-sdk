import { CloudAdminConfig, CloudAdminIframeApi } from './types';
export declare const createIframe: (config: CloudAdminConfig, accessToken: string) => HTMLIFrameElement;
export declare const connectIframe: (config: CloudAdminConfig, iframe: HTMLIFrameElement) => Promise<import("penpal").AsyncMethodReturns<CloudAdminIframeApi>>;
