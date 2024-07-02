import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { SVGProps } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';

type MenuOption = {
    Icon: React.FC<SVGProps<SVGSVGElement>>;
    isActive?: boolean;
    svgProps?: SVGProps<SVGSVGElement>;
} & React.HTMLProps<HTMLAnchorElement>;

export const MenuOption = observer(({ Icon, isActive, svgProps, ...props }: MenuOption) => {
    const getColorMode = useColorMode();

    return (
        <a
            {...props}
            className={classNames(
                'w-[40px] h-[40px] lg:rounded-full flex items-center justify-center transition-colors',
                isActive
                    ? 'bg-brand-500'
                    : getColorMode('bg-primary-bg-lightness-100', 'bg-primary-bg-darkness-900'),
                isActive
                    ? 'text-text-primary-950'
                    : getColorMode('text-text-secondary-500', 'text-text-secondary-100')
            )}
        >
            <Icon
                {...svgProps}
                className={classNames('transition-colors', svgProps?.className)}
                height={svgProps?.height ?? 18}
                width={svgProps?.width ?? 18}
            />
        </a>
    );
});
