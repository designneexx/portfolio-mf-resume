import type { AxiosInstance } from 'axios';

import { UsersApi } from './types';

export const createUsersApi = (api: AxiosInstance): UsersApi => ({
    sendMessage: (userId: string, data, config) =>
        api.post(`/users/send-message/${userId}`, data, config)
});
