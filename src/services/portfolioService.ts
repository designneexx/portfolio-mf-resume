import { AxiosError } from 'axios';
import { PortfolioApi } from 'src/api/portfolio/types';
import { PortfolioStore } from 'src/store/portfolioStore';
import { NotificationService } from './notificationService';

export class PortfolioService {
    constructor(
        private readonly portfolioStore: PortfolioStore,
        private readonly portfolioApi: PortfolioApi,
        private readonly notificationService: NotificationService
    ) {}

    async getResume(username: string) {
        this.portfolioStore.setIsLoading(true);

        try {
            const { data } = await this.portfolioApi.getResume(username);

            this.portfolioStore.setPortfolio(data);
        } catch (err) {
            const error = err as Error;

            if (err instanceof AxiosError) {
                const { response } = err;
                const message = response?.data?.message;

                this.notificationService.notifyAnError({
                    title: message || 'Неизвестная ошибка'
                });
            } else {
                this.notificationService.notifyAnError({
                    title: error?.message || 'Неизвестная ошибка'
                });
            }

            console.log(error);
        } finally {
            this.portfolioStore.setIsLoading(false);
        }
    }
}
