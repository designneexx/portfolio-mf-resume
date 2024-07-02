import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { HTMLProps, useState } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';

type AvatarProps = {
    className?: string;
    name: string;
    src?: string;
} & HTMLProps<HTMLDivElement>;

export const Avatar = observer(({ className, name = '', src, ...props }: AvatarProps) => {
    const getColorMode = useColorMode();
    const [isError, setIsError] = useState(false);
    const [firstLetter] = name.toUpperCase();
    const showImage = src && !isError;

    function onError() {
        setIsError(true);
    }

    function onLoad() {
        setIsError(false);
    }

    return (
        <figure
            {...props}
            className={classNames(
                'rounded-[50%] w-[150px] h-[150px] flex justify-center items-center text-brand-500 text-[4rem]',
                getColorMode('bg-primary-bg-darkness-100', 'bg-primary-bg-darkness-900'),
                className
            )}
        >
            {showImage ? (
                <img alt={name} onError={onError} onLoad={onLoad} src={src} />
            ) : (
                firstLetter
            )}
        </figure>
    );
});
