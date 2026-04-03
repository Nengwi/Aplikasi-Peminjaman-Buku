import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'bg-slate-800/50 border-white/10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl shadow-sm transition-all placeholder:text-slate-500 ' +
                className
            }
            ref={localRef}
        />
    );
});