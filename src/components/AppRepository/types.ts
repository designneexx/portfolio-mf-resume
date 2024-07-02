import { NotificationService } from 'src/services/notificationService';
import { PortfolioService } from 'src/services/portfolioService';
import { UsersService } from 'src/services/usersService';
import { PortfolioStore } from 'src/store/portfolioStore';
import { UiStore } from 'src/store/ui';
import { UserStore } from 'src/store/userStore';

export interface AppStores {
    portfolioStore: PortfolioStore;
    uiStore: UiStore;
    userStore: UserStore;
}

export interface AppServices {
    notificationService: NotificationService;
    portfolioService: PortfolioService;
    usersService: UsersService;
}

export interface AppRepository {
    services: AppServices;
    stores: AppStores;
}
