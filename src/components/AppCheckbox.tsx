import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React, { useState } from 'react'
import { ColorResult } from 'react-color';

type Props = {
    checked?: boolean,
    disabled?: boolean,
    onChange?: (checked: boolean) => void,
    children?: React.ReactNode,
    color: ColorResult,
}

const AppCheckbox = (props: Props) => {
    return (
        <label
            className={`inline-flex items-center cursor-pointer ${props.disabled ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => !props.disabled && props.onChange?.(!props.checked)}
        >
            <div
                className={`select-none rounded border-2 w-4 h-4 me-1 transition-colors flex items-center justify-center`}
                style={{
                    borderColor: props.color.hex,
                    backgroundColor: props.checked ? props.color.hex : 'transparent',
                }}>
                <AnimatePresence>
                    {
                        props.checked &&
                        <motion.div exit={{ scale: .2, opacity: 3 }} animate={{ scale: 1, opacity: 1 }} initial={{ scale: .2, opacity: 3 }}>
                            <Check color='white' size={14} />
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
            {props.children}
        </label>
    )
}

export default AppCheckbox