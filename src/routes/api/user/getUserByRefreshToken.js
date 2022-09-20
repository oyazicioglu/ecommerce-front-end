import axios from 'axios';
import fetch from 'cross-fetch';

export const getUserByRefreshToken = async (cookies) => {
    if (!cookies) {
        return undefined;
    }

    const [name, value] = cookies.split('=');

    const result = await axios.post(
        'http://127.0.0.1:8080/api/user/get/byrefreshtoken',
        {
            RefreshToken: value,
        },
        {
            withCredentials: true,
        }
    );

    return result.data ? result.data : undefined;
};
