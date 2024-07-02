import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { X } from 'react-feather';
import { useAppStores } from 'src/hooks/useAppStores';
import { useColorMode } from 'src/hooks/useColorMode';
import { usePortfolio } from 'src/hooks/usePortfolio';
import { useOnClickOutside } from 'usehooks-ts';
import { Avatar } from '../Avatar';
import { ProgressList } from './ProgressList';

export const LeftPanel = observer(() => {
    const ref = useRef<HTMLDivElement>(null);
    const { portfolioStore, uiStore } = useAppStores();
    const portfolio = usePortfolio();
    const { avatarPath, email, firstName, fullName, phone, profession, resumeUrl, surname } =
        portfolio;
    const { languages, skills } = portfolioStore;
    const { closeSidebar, isOpenSidebar } = uiStore;

    const getColorMode = useColorMode();

    useOnClickOutside(ref, () => {
        closeSidebar();
    });

    return (
        <article
            className={classNames(
                'py-[1.5rem] w-[350px] grid grid-cols-1 grid-rows-[max-content,1fr,max-content] overflow-hidden items-center h-full transition-transform max-lg:pt-0 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-20',
                {
                    'max-lg:-translate-x-full': !isOpenSidebar
                },
                getColorMode('bg-white-50', 'bg-white-950')
            )}
            ref={ref}
        >
            <div className='w-full flex flex-col items-center px-[1.75rem]'>
                <button
                    className={classNames(
                        'w-full h-[55px] flex items-center justify-start typography-md lg:hidden',
                        getColorMode('', 'text-text-primary-50')
                    )}
                    onClick={closeSidebar}
                >
                    <X width={30} />
                    <span>Закрыть</span>
                </button>

                <Avatar
                    className='max-md:w-[75px] max-md:h-[75px] overflow-hidden'
                    name={fullName}
                    src={avatarPath}
                />

                <h5
                    className={classNames(
                        'typography-lg mt-[1.5rem]',
                        getColorMode('', 'text-text-primary-50')
                    )}
                >
                    {`${surname} ${firstName}`}
                </h5>

                <p
                    className={classNames(
                        'badge-sm font-semibold mt-[1rem]',
                        getColorMode('text-text-secondary-500', 'text-text-secondary-200')
                    )}
                >
                    {profession}
                </p>
                <p
                    className={classNames(
                        'typography-md mt-[1rem] leading-[1]',
                        getColorMode('text-text-secondary-500', 'text-text-secondary-200')
                    )}
                >
                    {email}
                </p>
                <p
                    className={classNames(
                        'typography-md mt-[1rem] leading-[1]',
                        getColorMode('text-text-secondary-500', 'text-text-secondary-200')
                    )}
                >
                    {phone}
                </p>

                <div
                    className={classNames(
                        'mt-[1rem] mb-[1rem]',
                        getColorMode('divider-light', 'divider-dark')
                    )}
                />
            </div>

            <div className='w-full h-full overflow-y-auto px-[1.75rem]'>
                <ProgressList list={languages} title='Языки' />

                <div
                    className={classNames(
                        'mt-[1rem] mb-[1rem]',
                        getColorMode('divider-light', 'divider-dark')
                    )}
                />

                <ProgressList list={skills} title='Навыки' />
            </div>

            <div className='px-[1.75rem]'>
                <div
                    className={classNames(
                        'mt-[1.5rem]',
                        getColorMode('divider-light', 'divider-dark')
                    )}
                />
                <a
                    className='btn mt-[2.5rem] w-full flex items-center justify-center'
                    download
                    href={resumeUrl}
                >
                    Скачать резюме
                </a>
            </div>
        </article>
    );
});
