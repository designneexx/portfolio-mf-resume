import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Fragment, HTMLProps } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';
import { ProfessionalDetail, type TProfessionalDetail } from './ProfessionalDetail';

export type ProfessionalDetailItem = {
    id: string;
} & TProfessionalDetail;

type ProfessionalCardProps = {
    list: ProfessionalDetailItem[];
} & Omit<HTMLProps<HTMLDivElement>, 'list'>;

export const ProfessionalCard = observer(({ className, list, ...props }: ProfessionalCardProps) => {
    const listSize = list.length;
    const getColorMode = useColorMode();

    return (
        <article
            {...props}
            className={classNames(
                'md:py-[3.6rem] shadow-primary w-full md:px-[3.7rem] py-[2rem] px-[2rem]',
                getColorMode('bg-white-50', 'bg-white-950'),
                className
            )}
        >
            {list.map(({ duration, id, location, secondaryTitle, text, title }, index) => (
                <Fragment key={id}>
                    <ProfessionalDetail
                        duration={duration}
                        location={location}
                        secondaryTitle={secondaryTitle}
                        text={text}
                        title={title}
                    />
                    {index < listSize - 1 && (
                        <div
                            className={classNames(getColorMode('divider-light', 'divider-dark'))}
                        />
                    )}
                </Fragment>
            ))}
        </article>
    );
});
