var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAccessToken } from './rest-api';
import { createIframe, connectIframe } from './iframe-api';
export const CloudAdminWebsite = (config) => {
    let connection;
    const createWebsite = () => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = yield getAccessToken(config);
        const iframe = createIframe(config, accessToken);
        connection = yield connectIframe(config, iframe);
    });
    const getAvailablePages = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield connection.getAvailablePages(config.partner);
    });
    const setRoute = (route) => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.setRoute(route);
    });
    return {
        createWebsite,
        getAvailablePages,
        setRoute
    };
};
