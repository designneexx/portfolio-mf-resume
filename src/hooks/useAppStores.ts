import { useContext } from 'react';
import { AppRepositoryContext } from 'src/components/AppRepository';
import { AppStores } from 'src/components/AppRepository/types';

export function useAppStores(): AppStores {
    const context = useContext(AppRepositoryContext);

    if (!context) {
        throw new Error('Хранилище не определено');
    }

    return context.stores;
}
