import { Switch } from '@nextui-org/react'
import { Moon, Sun } from 'lucide-react'
import React, { useMemo } from 'react'
import { ColorResult } from 'react-color'
import lib from '../lib'
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    color: ColorResult,
    isSelected: boolean,
    onChange: (value: boolean) => void,
}

const AppThemeSwitch = (props: Props) => {
    const color = useMemo(() => {
        const hsl = lib.color.rgbToHsl(props.color.rgb);
        return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
    }, [props.color]);


    return (
        <Switch
            isSelected={props.isSelected}
            onChange={() => props.onChange(!props.isSelected)}
            thumbIcon={
                props.isSelected ? <Sun  /> : <Moon  />
            }

            style={{ '--nextui-primary': color }}
        />
    )
}

export default AppThemeSwitch