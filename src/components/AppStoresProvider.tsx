import { PropsWithChildren, useEffect } from 'react';
import { useAppStores } from 'src/hooks/useAppStores';
import { ColorMode } from '../store/ui';

export const COLOR_MODE_KEY = 'COLOR_MODE_KEY';

type AppStoresProviderProps = PropsWithChildren<Record<string, unknown>>;

export function ThemeProvider({ children }: AppStoresProviderProps) {
    const { uiStore } = useAppStores();

    useEffect(() => {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ColorMode.Dark
            : ColorMode.Light;
        const localStorageTheme: ColorMode | null = window.localStorage.getItem(
            COLOR_MODE_KEY
        ) as ColorMode;

        uiStore.setTheme(localStorageTheme || systemTheme);
    }, [uiStore]);

    return children;
}
