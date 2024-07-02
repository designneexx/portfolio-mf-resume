import { useState } from 'react';

export function useConst<Value>(callback: () => Value): Value {
    const [value] = useState(callback);

    return value;
}
