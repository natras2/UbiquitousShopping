import { sha512 } from 'js-sha512';

export const encryptPassword = (password) => {
    return sha512(password);
}