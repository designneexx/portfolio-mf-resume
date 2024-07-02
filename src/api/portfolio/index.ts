import type { AxiosInstance } from 'axios';

import { PortfolioApi } from './types';

export const createPortfolioApi = (api: AxiosInstance): PortfolioApi => ({
    getResume: (resumeId: string, config) => api.get(`/portfolio/resume/${resumeId}`, config)
});
