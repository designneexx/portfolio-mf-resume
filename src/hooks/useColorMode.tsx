import { ColorMode } from 'src/store/ui';
import { useAppStores } from './useAppStores';

type GetThemeValue = <Value>(lightValue: Value, darkValue: Value) => Value;

export function useColorMode(): GetThemeValue {
    const { uiStore } = useAppStores();

    const getValue: GetThemeValue = (lightValue, darkValue) => {
        const isLight = uiStore.theme === ColorMode.Light;

        return isLight ? lightValue : darkValue;
    };

    return getValue;
}
