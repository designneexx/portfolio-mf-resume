import { makeAutoObservable } from 'mobx';
import { Tokens, UserResponse } from './types';

export class UserStore {
    accessToken: null | string = null;
    refreshToken: null | string = null;
    setAccessToken = (value: null | string) => {
        this.accessToken = value;
    };

    setRefreshToken = (value: null | string) => {
        this.refreshToken = value;
    };

    setToken = (accessToken: null | string, refreshToken: null | string) => {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    };

    setUser = (user: null | UserResponse) => {
        this.user = user;
    };

    setUserTokens = (user: UserResponse, tokens: Tokens) => {
        this.user = user;
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
    };

    user: null | UserResponse = null;

    constructor() {
        makeAutoObservable(this);
    }
}
