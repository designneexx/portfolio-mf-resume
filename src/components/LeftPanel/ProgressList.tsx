import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { HTMLProps } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';
import { Progress } from '../Progress';

type ProgressDetail = {
    label: string;
    value: number;
};

type ProgressList = {
    list: ProgressDetail[];
    title: string;
} & Omit<HTMLProps<HTMLDivElement>, 'list'>;

export const ProgressList = observer(({ className, list, title, ...props }: ProgressList) => {
    const getColorMode = useColorMode();

    return (
        <div {...props} className={classNames('w-full flex flex-col gap-[0.5rem]', className)}>
            <p
                className={classNames(
                    'typography-lg mb-[0.25rem]',
                    getColorMode('', 'text-text-primary-50')
                )}
            >
                {title}
            </p>
            {list.map(({ label, value }) => (
                <div className='w-full' key={label}>
                    <div className='flex justify-between w-full'>
                        <p
                            className={classNames(
                                'typography-md',
                                getColorMode('text-text-secondary-500', 'text-text-secondary-300')
                            )}
                        >
                            {label}
                        </p>
                        <p
                            className={classNames(
                                'typography-md',
                                getColorMode('text-text-secondary-500', 'text-text-secondary-300')
                            )}
                        >{`${value}%`}</p>
                    </div>
                    <Progress progress={value} />
                </div>
            ))}
        </div>
    );
});
