import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import defaultImage from 'src/assets/images/ai-chip-artificial-intelligence-future-technology-innovation.jpg';
import { useColorMode } from 'src/hooks/useColorMode';
import { usePortfolio } from 'src/hooks/usePortfolio';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';

function HeroComponent(_props: Record<string, unknown>, ref: ForwardedRef<HTMLDivElement>) {
    const getColorMode = useColorMode();
    const portfolio = usePortfolio();
    const { aboutMe, avatarPath, fullName, mainDegreeOfQualification } = portfolio;
    const [imageSrc, setImageSrc] = useState(avatarPath);

    const onError = () => {
        setImageSrc(defaultImage);
    };

    useEffect(() => {
        setImageSrc(avatarPath);
    }, [avatarPath]);

    return (
        <section
            className={classNames(
                'shadow-primary grid grid-cols-2 max-2xl:grid-cols-1',
                getColorMode('bg-white-50', 'bg-white-950')
            )}
            id={SectionIdentifier.Hero}
            ref={ref}
        >
            <div className='md:p-[3.75rem] p-[2rem]'>
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
                    'md:p-[3.75rem] p-[2rem] flex items-center justify-center max-lg:-order-1',
                    getColorMode('bg-white-100', 'bg-shark-950')
                )}
            >
                <img onError={onError} src={imageSrc || defaultImage} />
            </div>
        </section>
    );
}

export const Hero = observer(forwardRef<HTMLDivElement>(HeroComponent));
