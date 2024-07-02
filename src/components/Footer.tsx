import classNames from 'classnames';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useColorMode } from 'src/hooks/useColorMode';
import { useConst } from 'src/hooks/useConst';
import { usePortfolio } from 'src/hooks/usePortfolio';

export const Footer = observer(() => {
    const getColorMode = useColorMode();
    const date = useConst(() => new Date());
    const { createdAt } = usePortfolio();
    const dayjsCreatedAt = useMemo(() => dayjs(createdAt), [createdAt]);

    return (
        <footer
            className={classNames(
                'mt-[7rem] py-[1.8rem] w-full flex justify-center items-center',
                getColorMode('bg-white-50', 'bg-white-950')
            )}
        >
            <span className={classNames('typography-md', getColorMode('', 'text-text-primary-50'))}>
                {`${dayjsCreatedAt.year()} - ${date.getFullYear()} Все права защищены.`}
            </span>
        </footer>
    );
});
