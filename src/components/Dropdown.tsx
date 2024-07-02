import { CSSProperties, ReactNode, RefObject, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { appElement } from 'src/consts/domElements';
import { noop } from 'src/utils/noop';
import { useEventCallback, useEventListener, useOnClickOutside } from 'usehooks-ts';

export enum DropdownPlacement {
    BottomLeft = 'bottom-left',
    BottomRight = 'bottom-right',
    BottomRightStart = 'bottom-right-start'
}

type DropdownProps<T extends HTMLElement> = {
    children(ref: RefObject<T>): ReactNode;
    containerEl?: Element | null;
    content: ReactNode;
    isOpen: boolean;
    onClose?(): void;
    placement: DropdownPlacement;
    shiftX?: number;
    shiftY?: number;
};

export function Dropdown<T extends HTMLElement>({
    children,
    containerEl,
    content,
    isOpen,
    onClose = noop,
    placement,
    shiftX = 0,
    shiftY = 0
}: DropdownProps<T>) {
    const ref = useRef<T>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentContainerEl = containerEl || appElement;
    const [dropdownWrapperCSS, setDropdownWrapperCSS] = useState<CSSProperties>();
    const setPosition = useEventCallback(() => {
        const { current } = ref;

        if (!current) return;

        const rect = current.getBoundingClientRect();

        setDropdownWrapperCSS(getPosition(rect));
    });

    function getPosition({ bottom, left, right }: DOMRectReadOnly): CSSProperties {
        switch (placement) {
            case DropdownPlacement.BottomLeft:
                return {
                    left: left + shiftX,
                    top: bottom + shiftY
                };
            case DropdownPlacement.BottomRight:
                return {
                    left: right + shiftX,
                    top: bottom + shiftY
                };
            case DropdownPlacement.BottomRightStart:
                return {
                    left: right + shiftX,
                    top: bottom + shiftY,
                    transform: 'translateX(-100%)'
                };
        }
    }

    useLayoutEffect(() => {
        setPosition();
    }, [isOpen, setPosition]);

    useOnClickOutside(dropdownRef, (e) => {
        const { target } = e;
        const { current } = ref;

        if (current?.contains(target as Node)) return;

        onClose();
    });

    useEventListener('resize', () => {
        window.requestAnimationFrame(setPosition);
    });

    if (!currentContainerEl) return null;

    return (
        <>
            {children(ref)}
            {createPortal(
                isOpen ? (
                    <div className='fixed z-50' ref={dropdownRef} style={dropdownWrapperCSS}>
                        {content}
                    </div>
                ) : null,
                currentContainerEl
            )}
        </>
    );
}
