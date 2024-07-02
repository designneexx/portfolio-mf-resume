import { useLayoutEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => getMatches(query));

    function getMatches(query: string) {
        return window.matchMedia(query).matches;
    }

    useLayoutEffect(() => {
        function handleChange() {
            setMatches(getMatches(query));
        }

        const matchMedia = window.matchMedia(query);

        handleChange();

        matchMedia.addEventListener('change', handleChange);

        return () => {
            matchMedia.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}
