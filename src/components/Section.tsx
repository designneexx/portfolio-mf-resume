import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ForwardedRef, forwardRef, HTMLProps, PropsWithChildren } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';

type SectionProps = {
    description: string;
    title: string;
} & PropsWithChildren<HTMLProps<HTMLDivElement>>;

function SectionComponent(
    { children, className, description, title, ...props }: SectionProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    const getColorMode = useColorMode();

    return (
        <section
            {...props}
            className={classNames('flex flex-col items-center w-full pt-[4rem]', className)}
            ref={ref}
        >
            <h3 className={classNames('typography-xl', getColorMode('', 'text-text-primary-50'))}>
                {title}
            </h3>
            <p
                className={classNames(
                    'typography-md  text-center mt-[1.5rem] max-w-[600px]',
                    getColorMode('text-text-secondary-500', 'text-text-secondary-300')
                )}
            >
                {description}
            </p>
            {children}
        </section>
    );
}

export const Section = observer(forwardRef<HTMLDivElement, SectionProps>(SectionComponent));
