import React, { useState } from 'react'

type Props<T> = {
    initialValue: T,
    children: (value: T, setState: (value: T) => void) => React.ReactNode,
}

export default function UseState<T>(props: Props<T>) {

    const [value, setValue] = useState<T>(props.initialValue);

    return (
        props.children(value, setValue)
    );
}

