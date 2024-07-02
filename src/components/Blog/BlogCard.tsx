import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { HTMLProps } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';

type BlogCardProps = {
    description: string;
    imageSrc?: string;
    link: string;
    title: string;
} & HTMLProps<HTMLDivElement>;

export const BlogCard = observer(
    ({ className, description, imageSrc, link, title, ...props }: BlogCardProps) => {
        const getColorMode = useColorMode();

        return (
            <article
                {...props}
                className={classNames(
                    'shadow-primary',
                    getColorMode('bg-white-50', 'bg-white-950'),
                    className
                )}
            >
                <figure className='w-full'>
                    <img alt={title} className='w-full object-cover h-[300px]' src={imageSrc} />
                </figure>
                <div className='p-[2.5rem]'>
                    <h5
                        className={classNames(
                            'typography-lg',
                            getColorMode('', 'text-text-primary-50')
                        )}
                    >
                        {title}
                    </h5>
                    <p
                        className={classNames(
                            'typography-md mt-[0.8rem]',
                            getColorMode('text-text-secondary-500', 'text-text-secondary-300')
                        )}
                    >
                        {description}
                    </p>
                    <a className='typography-lg block text-brand-500 mt-[0.8rem]' href={link}>
                        Читать далее
                    </a>
                </div>
            </article>
        );
    }
);
