import { PropsWithChildren, useEffect } from 'react';
import { useAppStores } from 'src/hooks/useAppStores';
import { ColorMode } from '../store/ui';

export const COLOR_MODE_KEY = 'COLOR_MODE_KEY';

type AppStoresProviderProps = PropsWithChildren<Record<string, unknown>>;

export function ThemeProvider({ children }: AppStoresProviderProps) {
    const { uiStore } = useAppStores();

    useEffect(() => {
        const localStorageTheme: ColorMode | null = window.localStorage.getItem(
            COLOR_MODE_KEY
        ) as ColorMode;

        uiStore.setTheme(localStorageTheme || ColorMode.Dark);
    }, [uiStore]);

    return children;
}
