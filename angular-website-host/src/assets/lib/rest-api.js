var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};
const apiPost = (url, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, Object.assign(Object.assign({}, request), { body: JSON.stringify(payload) }));
    if (response.headers.get('content-type') === 'application/json') {
        return response.json();
    }
    if (response.status >= 200 && response.status < 300) {
        return true;
    }
    return false;
});
export const getAccessToken = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const URL_GET_TOKEN = `${config.cloudAdminApiUrl}/tangoe/user/token`;
    const URL_VALIDATE_TOKEN = `${config.cloudAdminApiUrl}/token/validate`;
    const response = yield apiPost(URL_GET_TOKEN, {
        client_id: config.clientId,
        email: config.clientEmail
    });
    const result = yield apiPost(URL_VALIDATE_TOKEN, {
        client_id: config.clientId,
        access_token: response.access_token
    });
    return result ? response.access_token : null;
});
