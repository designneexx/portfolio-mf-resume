import axios, { type CreateAxiosDefaults } from 'axios';
import { observer } from 'mobx-react-lite';
import { createContext, PropsWithChildren, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { createPortfolioApi } from 'src/api/portfolio';
import { createUsersApi } from 'src/api/users';
import { useConst } from 'src/hooks/useConst';
import { NotificationService } from 'src/services/notificationService';
import { PortfolioService } from 'src/services/portfolioService';
import { UsersService } from 'src/services/usersService';
import { PortfolioStore } from 'src/store/portfolioStore';
import { UiStore } from 'src/store/ui';
import { UserStore } from 'src/store/userStore';
import { AppRepository } from './types';

export const AppRepositoryContext = createContext<AppRepository | null>(null);

const createAxiosInstance = (config?: CreateAxiosDefaults) =>
    axios.create({
        baseURL: process.env.BASE_API_URL,
        ...config
    });

interface AppRepositoryProviderProps {
    notificationService: NotificationService;
    resumeId?: string;
    userStore: UserStore;
}

function AppRepositoryProviderComponent({
    children,
    notificationService,
    resumeId: defaultResumeId = '',
    userStore
}: PropsWithChildren<AppRepositoryProviderProps>) {
    const { resumeId = defaultResumeId } = useParams();
    const instance = useConst(() => createAxiosInstance());
    const portfolioApi = useConst(() => createPortfolioApi(instance));
    const usersApi = useConst(() => createUsersApi(instance));
    const portfolioStore = useConst(() => new PortfolioStore());
    const uiStore = useConst(() => new UiStore());
    const portfolioService = useConst(
        () => new PortfolioService(portfolioStore, portfolioApi, notificationService)
    );
    const usersService = useConst(
        () => new UsersService(portfolioStore, usersApi, notificationService)
    );
    const appRepository = useMemo<AppRepository>(
        () => ({
            services: {
                notificationService,
                portfolioService,
                usersService
            },
            stores: {
                portfolioStore,
                uiStore,
                userStore
            }
        }),
        [notificationService, userStore, portfolioService, usersService, portfolioStore, uiStore]
    );

    useEffect(() => {
        portfolioService.getResume(resumeId);
    }, [portfolioService, resumeId]);

    return (
        <AppRepositoryContext.Provider value={appRepository}>
            {children}
        </AppRepositoryContext.Provider>
    );
}

export const AppRepositoryProvider = observer(AppRepositoryProviderComponent);
