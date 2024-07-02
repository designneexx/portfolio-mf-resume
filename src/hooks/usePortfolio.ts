import { useAppStores } from './useAppStores';

export function usePortfolio() {
    const { portfolioStore } = useAppStores();
    const { portfolio } = portfolioStore;

    if (!portfolio) {
        throw new Error('Portfolio cannot be null');
    }

    return portfolio;
}
