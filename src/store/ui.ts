import { makeAutoObservable } from 'mobx';
import { COLOR_MODE_KEY } from 'src/components/ThemeProvider';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';

export enum ColorMode {
    Dark = 'dark',
    Light = 'light'
}

export class UiStore {
    activeIds: SectionIdentifier[] = [];

    closeMenu = () => {
        this.isOpenMenu = false;
    };

    closeSidebar = () => {
        this.isOpenSidebar = false;
    };

    isOpenMenu = false;

    isOpenSidebar = false;

    setActiveIds = (value: SectionIdentifier[]) => {
        this.activeIds = value;
    };

    setTheme = (value: ColorMode) => {
        this.theme = value;

        window.localStorage.setItem(COLOR_MODE_KEY, value);
    };

    theme = ColorMode.Light;

    toggleOpenMenu = () => {
        this.isOpenMenu = !this.isOpenMenu;
    };

    toggleOpenSidebar = () => {
        this.isOpenSidebar = !this.isOpenSidebar;
    };

    toggleTheme = () => {
        this.setTheme(this.theme === ColorMode.Dark ? ColorMode.Light : ColorMode.Dark);
    };

    constructor() {
        makeAutoObservable(this);
    }
}
