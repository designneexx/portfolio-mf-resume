import { UseToastOptions } from '@chakra-ui/react';
import { NotificationTypes } from 'src/types/notificationTypes';
import { EventEmitter } from 'src/utils/EventEmitter';

export class NotificationService {
    notifyAnError = (options: Omit<UseToastOptions, 'type'>, error?: Error) => {
        this.eventEmitter.emit(NotificationTypes.Error, options, error);
    };

    notifyAnSuccess = (options: Omit<UseToastOptions, 'type'>) => {
        this.eventEmitter.emit(NotificationTypes.Success, options);
    };

    onError = (callback: (options: Omit<UseToastOptions, 'type'>, error?: Error) => void) => {
        return this.eventEmitter.on(
            NotificationTypes.Error,
            (options: Omit<UseToastOptions, 'type'>, error?: Error) => {
                if (error) {
                    console.log(error);
                }

                callback(options, error);
            }
        );
    };

    onSuccess = (callback: (options: Omit<UseToastOptions, 'type'>) => void) => {
        return this.eventEmitter.on(NotificationTypes.Error, callback);
    };

    constructor(private readonly eventEmitter: EventEmitter) {}
}
