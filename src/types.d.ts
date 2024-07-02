/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="node" />
/// <reference types="NodeJS" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.avif' {
    const src: string;
    export default src;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.css' {
    const styles: { readonly [className: string]: string };
    export default styles;
}

declare module '*.scss' {
    const styles: { readonly [className: string]: string };
    export default styles;
}

declare module '*.svg' {
    import React = require('react');

    const src: React.FC<React.SVGProps<SVGSVGElement>>;
    export default src;
}
