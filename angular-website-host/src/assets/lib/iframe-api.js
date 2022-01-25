var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { connectToChild } from "penpal";
export const createIframe = (config, accessToken) => {
    const id = config.websiteContainerId || 'cloudadmin-container';
    const container = document.getElementById(id);
    const iframe = document.createElement("iframe");
    container === null || container === void 0 ? void 0 : container.appendChild(iframe);
    iframe.id = "cloudadmin";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.setAttribute("style", "border: 0");
    // TODO: add connecting-to-iframe-host page instead of admin
    iframe.src = `${config.cloudAdminWebsiteUrl}/admin?access_token=${accessToken}`;
    return iframe;
};
export const connectIframe = (config, iframe) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = connectToChild({
        debug: config.debugMode,
        iframe: iframe
    });
    return yield connection.promise;
});
