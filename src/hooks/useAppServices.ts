import { useContext } from 'react';
import { AppRepositoryContext } from 'src/components/AppRepository';
import { AppServices } from 'src/components/AppRepository/types';

export function useAppServices(): AppServices {
    const context = useContext(AppRepositoryContext);

    if (!context) {
        throw new Error('Хранилище не определено');
    }

    return context.services;
}
