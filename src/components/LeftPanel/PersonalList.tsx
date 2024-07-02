import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { HTMLProps } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';

interface Personal {
    label: string;
    value: string;
}

type PersonalListProps = {
    list: Personal[];
} & Omit<HTMLProps<HTMLDivElement>, 'list'>;

export const PersonalList = observer(({ className, list, ...props }: PersonalListProps) => {
    const getColorMode = useColorMode();

    return (
        <div {...props} className={classNames('w-full flex flex-col gap-[1rem]', className)}>
            {list.map(({ label, value }) => (
                <div className='flex justify-between items-center w-full' key={`${label}${value}`}>
                    <div className='badge'>{label}</div>
                    <div
                        className={classNames(
                            'typography-md',
                            getColorMode('', 'text-text-primary-50')
                        )}
                    >
                        {value}
                    </div>
                </div>
            ))}
        </div>
    );
});
