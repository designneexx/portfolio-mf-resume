import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Menu as MenuIcon, Sun } from 'react-feather';
import { useAppStores } from 'src/hooks/useAppStores';
import { useColorMode } from 'src/hooks/useColorMode';
import { Avatar } from '../Avatar';
import { Menu } from './Menu';

function HeaderComponent() {
    const getColorMode = useColorMode();
    const { uiStore } = useAppStores();
    const { toggleOpenSidebar, toggleTheme } = uiStore;

    return (
        <header
            className={classNames(
                'px-[3rem] h-[55px] flex justify-between w-full items-center',
                getColorMode('bg-white-50', 'bg-white-950')
            )}
        >
            <div className='flex items-center gap-[1rem]'>
                <button
                    className={classNames(getColorMode('', 'text-text-primary-50'))}
                    onClick={toggleOpenSidebar}
                >
                    <MenuIcon width={30} />
                </button>
                <Avatar className='w-[32px] h-[32px] typography-md' name='Михаил Орлов' />
                <p
                    className={classNames(
                        'typography-lg',
                        getColorMode('', 'text-text-primary-50')
                    )}
                >
                    Михаил
                </p>
            </div>
            <div className='flex gap-[1.5rem] items-center'>
                <button
                    className={classNames(
                        'flex justify-center',
                        getColorMode('text-text-primary-950', 'text-text-primary-50')
                    )}
                    onClick={toggleTheme}
                >
                    <Sun
                        className={getColorMode('fill-text-primary-950', 'fill-text-primary-50')}
                        height={20}
                        width={20}
                    />
                </button>
                <Menu />
            </div>
        </header>
    );
}

export const Header = observer(HeaderComponent);
