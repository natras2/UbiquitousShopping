import { sha256 } from 'js-sha256';
import axios from 'axios'; 

export const encryptPassword = (password) => {
    return sha256(password);
}

const API_ENDPOINTS = {
    Login: {
        method: 'POST',
        url: 'https://api.ubishop.it/auth/login',
    },
    Signup: {
        method: 'POST',
        url: 'https://api.ubishop.it/auth/signup',
    },
    GetAccountInformation: {
        method: 'GET',
        url: 'https://api.ubishop.it/account',
    },
};

function replaceParameters(url, parameters) {
    if (url.includes('{')) {
        const urlParameters = url.match(/\{(\w+)\}/g);
        if (urlParameters) {
            urlParameters.forEach((parameterToReplace) => {
                const paramName = parameterToReplace.slice(1, -1);
                if (parameters[paramName]) {
                    url = url.replace(parameterToReplace, parameters[paramName]);
                    delete parameters[paramName];
                }
                else {
                    return false;
                }
            });
        }

        if (!url.includes('{'))
            return true;

        return false;
    }
    else {
        return true;
    }
}

export async function makeAPIRequest(operation, serializedData, parameters, isProtected) {
    if (!API_ENDPOINTS[operation]) {
        return { 
            code: 0 
        };
    }

    const method = API_ENDPOINTS[operation].method;
    let url = API_ENDPOINTS[operation].url;

    if (parameters != null) {
        if (!replaceParameters(url, parameters)) {
            return { code: 0 };
        }

        if (Object.keys(parameters).length > 0) {
            url += '?';
            url += new URLSearchParams(parameters).toString();
        }
    }

    try {
        var response;

        if (serializedData != null) {
            response = await axios({
                method: method,
                url: url,
                data: serializedData,
                headers: (isProtected) ? { Authorization: `Bearer ${sessionStorage.getItem('token')}` } : undefined,
            });
        } 
        else {
            response = await axios({
                method: method,
                url: url,
                headers: (isProtected) ? { Authorization: `Bearer ${sessionStorage.getItem('token')}` } : undefined,
            });
        }

        return {
            code: response.status,
            body: response.data
        };
    } 
    catch (error) {
        if (error.response) {
            return {
                code: error.response.status,
                body: error.response.data
            };
        } 
        else {
            console.error('No response to report', error);
            return {
                code: 0,
                body: 'No response to report',
            };
        }
    }
}

