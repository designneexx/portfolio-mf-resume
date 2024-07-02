import MFProvider from './components/MFProvider';
import { useConst } from './hooks/useConst';
import { NotificationService } from './services/notificationService';
import { UserStore } from './store/userStore';
import { EventEmitter } from './utils/EventEmitter';

export function App() {
    const eventEmitter = useConst(() => new EventEmitter());
    const notificationService = useConst(() => new NotificationService(eventEmitter));
    const userStore = useConst(() => new UserStore());

    return <MFProvider notificationService={notificationService} userStore={userStore} />;
}
