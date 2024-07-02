import { AxiosError } from 'axios';
import { SendMessageRequest } from 'src/api/portfolio/types';
import { UsersApi } from 'src/api/users/types';
import { PortfolioStore } from 'src/store/portfolioStore';
import { NotificationService } from './notificationService';

export class UsersService {
    constructor(
        private readonly portfolioStore: PortfolioStore,
        private readonly usersApi: UsersApi,
        private readonly notificationService: NotificationService
    ) {}

    async sendMessage(data: SendMessageRequest) {
        const { portfolio } = this.portfolioStore;

        if (!portfolio) return false;

        try {
            await this.usersApi.sendMessage(portfolio.userId, data);

            this.notificationService.notifyAnSuccess({
                title: 'Ваше письмо отправлено:) Ожидайте ответа.'
            });
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
        }
    }
}
