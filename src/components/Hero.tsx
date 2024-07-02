import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ForwardedRef, forwardRef } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';
import { usePortfolio } from 'src/hooks/usePortfolio';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';

function HeroComponent(_props: Record<string, unknown>, ref: ForwardedRef<HTMLDivElement>) {
    const getColorMode = useColorMode();
    const portfolio = usePortfolio();
    const { aboutMe, avatarPath, fullName, mainDegreeOfQualification } = portfolio;

    return (
        <section
            className={classNames(
                'shadow-primary max-md:p-[3rem] grid lg:grid-cols-2 max-lg:grid-cols-1',
                getColorMode('bg-white-50', 'bg-white-950')
            )}
            id={SectionIdentifier.Home}
            ref={ref}
        >
            <div className='p-[3.75rem]'>
                <h1
                    className={classNames(
                        'typography-xxl',
                        getColorMode('', 'text-text-primary-50')
                    )}
                >
                    {fullName}
                    <br />
                    <span className='text-brand-500'>{mainDegreeOfQualification}</span>
                </h1>
                <p
                    className={classNames(
                        'typography-md mt-[1.25rem]',
                        getColorMode('text-text-secondary-500', 'text-text-secondary-300')
                    )}
                >
                    {aboutMe}
                </p>
                <a
                    className='btn-lg mt-[1.5rem] inline-block'
                    href={`#${SectionIdentifier.Contact}`}
                >
                    Связаться со мной
                </a>
            </div>
            <div
                className={classNames(
                    'p-[3.75rem] flex items-center justify-center max-lg:-order-1',
                    getColorMode('', 'bg-shark-950')
                )}
            >
                <img src={avatarPath} />
            </div>
        </section>
    );
}

export const Hero = observer(forwardRef<HTMLDivElement>(HeroComponent));
