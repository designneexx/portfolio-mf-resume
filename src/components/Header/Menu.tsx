import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { MoreHorizontal } from 'react-feather';
import { ICONS_MAP, SECTION_IDENTIFIERS, SECTION_NAMES } from 'src/consts/menu';
import { useAppStores } from 'src/hooks/useAppStores';
import { useColorMode } from 'src/hooks/useColorMode';
import { Dropdown, DropdownPlacement } from '../Dropdown';
import { MenuOption } from '../MenuOption';

export const Menu = observer(() => {
    const getColorMode = useColorMode();
    const { uiStore } = useAppStores();
    const { activeIds, closeMenu, isOpenMenu, toggleOpenMenu } = uiStore;

    return (
        <Dropdown<HTMLButtonElement>
            content={
                <div
                    className={classNames(
                        'flex flex-col rounded-md overflow-hidden w-[200px] shadow-primary',
                        getColorMode('bg-white-50', 'bg-white-950')
                    )}
                >
                    {SECTION_IDENTIFIERS.map((sectionIdentifier) => (
                        <div className='grid grid-cols-[max-content,1fr]' key={sectionIdentifier}>
                            <MenuOption
                                href={`#${sectionIdentifier}`}
                                Icon={ICONS_MAP[sectionIdentifier]}
                                isActive={activeIds.includes(sectionIdentifier)}
                                key={sectionIdentifier}
                            />
                            <a
                                className={classNames(
                                    'typography-sm px-[1.5rem] flex items-center',
                                    getColorMode('', 'text-text-primary-50')
                                )}
                                href={`#${sectionIdentifier}`}
                            >
                                {SECTION_NAMES[sectionIdentifier]}
                            </a>
                        </div>
                    ))}
                </div>
            }
            isOpen={isOpenMenu}
            onClose={closeMenu}
            placement={DropdownPlacement.BottomRightStart}
            shiftY={15}
        >
            {(ref) => (
                <button
                    className={classNames(getColorMode('', 'text-text-primary-50'))}
                    onClick={toggleOpenMenu}
                    ref={ref}
                >
                    <MoreHorizontal width={25} />
                </button>
            )}
        </Dropdown>
    );
});
