import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import { Blog } from 'src/pages/Blog';
import { Home } from 'src/pages/Home';
import { NotificationService } from 'src/services/notificationService';
import { UserStore } from 'src/store/userStore';
import { AppRepositoryProvider } from './AppRepository';
import { ThemeProvider } from './AppStoresProvider';
import { MainLayout } from './MainLayout';

import '@fontsource/inter/cyrillic.css';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import 'src/index.css';

interface MFProviderProps {
    notificationService: NotificationService;
    userStore: UserStore;
}

function MFProviderComponent({ notificationService, userStore }: MFProviderProps) {
    return (
        <AppRepositoryProvider notificationService={notificationService} userStore={userStore}>
            <ThemeProvider>
                <MainLayout>
                    <Routes>
                        <Route element={<Home />} path='/' />
                        <Route element={<Blog />} path='/blog' />
                    </Routes>
                </MainLayout>
            </ThemeProvider>
        </AppRepositoryProvider>
    );
}

const MFProvider = observer(MFProviderComponent);

export default MFProvider;
