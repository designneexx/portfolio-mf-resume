type CallbackEvent<Args extends unknown[] = unknown[]> = (...data: Args) => void;

export class EventEmitter {
    private eventsMap = new Map<string, Set<CallbackEvent>>();

    clear = () => {
        this.eventsMap.clear();
    };

    emit = <Args extends unknown[]>(name: string, ...data: Args) => {
        const events = this.eventsMap.get(name) || new Set();

        const values = Array.from(events.values());

        for (const callback of values) {
            callback(...data);
        }
    };

    off = <Callback extends CallbackEvent>(name: string, callback: Callback) => {
        const events = this.eventsMap.get(name);

        events?.delete(callback);
    };

    on = <Args extends unknown[]>(name: string, callback: (...data: Args) => void) => {
        const events = this.eventsMap.get(name) || new Set();

        this.eventsMap.set(name, events.add(callback as CallbackEvent));

        return () => {
            events.delete(callback as CallbackEvent);
        };
    };
}
