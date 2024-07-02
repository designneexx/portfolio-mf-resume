import { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export interface SendMessageRequest {
    fullName: string;
    senderEmail: string;
    subject: string;
    text: string;
}

export interface UsersApi {
    sendMessage(
        userId: string,
        data: SendMessageRequest,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<unknown>>;
}
