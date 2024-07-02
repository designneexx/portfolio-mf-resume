import { createRoot } from 'react-dom/client';
import { App } from './app';
import { appElement } from './consts/domElements';

if (appElement) {
    const root = createRoot(appElement);
    root.render(<App />);
}
