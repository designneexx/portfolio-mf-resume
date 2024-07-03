import classNames from 'classnames';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { HTMLProps, ReactNode } from 'react';
import { Clock, MapPin } from 'react-feather';
import { useColorMode } from 'src/hooks/useColorMode';

export type TProfessionalDetail = {
    duration: {
        end: null | string;
        start: string;
    };
    location?: ReactNode;
    secondaryTitle?: ReactNode;
    text: ReactNode;
    title: ReactNode;
};

type ProfessionalDetailProps = Omit<HTMLProps<HTMLDivElement>, 'title'> & TProfessionalDetail;

export const ProfessionalDetail = observer(
    ({
        className,
        duration,
        location,
        secondaryTitle,
        text,
        title,
        ...props
    }: ProfessionalDetailProps) => {
        const getColorMode = useColorMode();

        return (
            <div {...props} className={classNames('pt-[1.75rem] pb-[1.25rem]', className)}>
                <div>
                    <div className='flex xl:flex-row flex-col justify-between xl:gap-[2rem] gap-[0.5rem] items-start'>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <h5
                                className={classNames(
                                    'typography-xlg',
                                    getColorMode('', 'text-text-primary-50')
                                )}
                            >
                                {title}
                            </h5>
                            {location && (
                                <p
                                    className={classNames(
                                        'typography-md flex gap-[0.5rem] items-center',
                                        getColorMode(
                                            'text-text-secondary-500',
                                            'text-text-secondary-300'
                                        )
                                    )}
                                >
                                    <MapPin height={16} width={16} />
                                    {location}
                                </p>
                            )}
                        </div>
                        <p
                            className={classNames(
                                'typography-sm flex gap-[0.5rem] items-center',
                                getColorMode('text-text-secondary-500', 'text-text-secondary-300')
                            )}
                        >
                            <Clock height={16} width={16} />
                            <span className='flex gap-[0.25rem]'>
                                <span>
                                    {duration.start && dayjs(duration.start).format('DD.MM.YYYY')}
                                </span>
                                -
                                <span>
                                    {(duration.end && dayjs(duration.end).format('DD.MM.YYYY')) ||
                                        'по настоящее время'}
                                </span>
                            </span>
                        </p>
                    </div>
                    {secondaryTitle && (
                        <h3
                            className={classNames(
                                'badge typography-lg grid mt-[1.25rem] max-w-max',
                                getColorMode('', 'text-text-primary-50')
                            )}
                        >
                            {secondaryTitle}
                        </h3>
                    )}
                    <p
                        className={classNames(
                            'typography-md mt-[1.25rem]',
                            getColorMode('text-text-secondary-500', 'text-text-secondary-300')
                        )}
                    >
                        {text}
                    </p>
                </div>
            </div>
        );
    }
);
