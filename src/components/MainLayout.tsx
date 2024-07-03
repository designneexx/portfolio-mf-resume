import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import { breakpointsScreens } from 'src/consts/breakpoints';
import { useAppStores } from 'src/hooks/useAppStores';
import { useColorMode } from 'src/hooks/useColorMode';
import { useMediaQuery } from 'src/hooks/useMediaQuery';
import { Header } from './Header';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

export const MainLayout = observer(({ children }: PropsWithChildren<unknown>) => {
    const { uiStore } = useAppStores();
    const { isOpenSidebar } = uiStore;
    const getColorMode = useColorMode();
    const isLessLg = useMediaQuery(`(max-width: ${breakpointsScreens.xl})`);

    return (
        <div
            className={classNames(
                'grid xl:grid-cols-[max-content,1fr,max-content] max-xl:grid-cols-1 max-xl:grid-rows-[max-content,1fr] h-full overflow-hidden transition-transform',
                getColorMode('bg-primary-bg-darkness-200', 'bg-primary-bg-darkness-950')
            )}
            id='portfolio-container'
        >
            {isLessLg && <Header />}
            <LeftPanel />
            <div className='overflow-y-auto scroll-smooth px-[3rem] scroll-py-[1px] max-xl:pt-[5.2rem] max-md:pt-[1.5rem] max-md:px-[1.5rem]'>
                {children}
            </div>
            <RightPanel />
            <div
                className={classNames({
                    'xl:hidden w-full h-full fixed top-0 left-0 z-10 backdrop-blur-sm bg-black-950 bg-opacity-40':
                        isOpenSidebar
                })}
            />
        </div>
    );
});
