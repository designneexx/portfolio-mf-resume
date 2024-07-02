import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import ThemeChangeIcon from 'src/assets/svg/logo.svg';
import { ICONS_MAP, SECTION_IDENTIFIERS } from 'src/consts/menu';
import { useAppStores } from 'src/hooks/useAppStores';
import { useColorMode } from 'src/hooks/useColorMode';
import { MenuOption } from '../MenuOption';

export const RightPanel = observer(() => {
    const { uiStore } = useAppStores();
    const { activeIds, toggleTheme } = uiStore;
    const getColorMode = useColorMode();

    return (
        <div
            className={classNames(
                'w-[108px] h-full py-[5.2rem] max-lg:hidden grid grid-cols-[100%] grid-rows-[max-content,1fr] items-center justify-center',
                getColorMode('bg-white-50', 'bg-white-950')
            )}
        >
            <button className={classNames('flex justify-center')} onClick={toggleTheme}>
                <ThemeChangeIcon
                    className={getColorMode('fill-text-primary-950', 'fill-text-primary-50')}
                    height={30}
                    width={30}
                />
            </button>
            <div className='h-full flex flex-col items-center justify-center gap-[3rem]'>
                {SECTION_IDENTIFIERS.map((sectionIdentifier) => (
                    <MenuOption
                        href={`#${sectionIdentifier}`}
                        Icon={ICONS_MAP[sectionIdentifier]}
                        isActive={activeIds.includes(sectionIdentifier)}
                        key={sectionIdentifier}
                    />
                ))}
            </div>
        </div>
    );
});
