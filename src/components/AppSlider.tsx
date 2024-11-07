import { Slider, Tooltip } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import { ColorResult } from 'react-color';
import lib from '../lib';
import { Badge } from 'lucide-react';



type Props = {
    max?: number,
    min?: number,
    initialValue: ColorLightRange,
    onChange: (range: ColorLightRange) => void,
    debounce?: number,
    color: ColorResult,
}

const AppSlider = (props: Props) => {

    const
        timerRef = useRef(0),
        [_range, _setRange] = useState(props.initialValue),
        colorBrightHex = lib.color.hslToHex({ ...props.color.hsl, l: 100 - _range[0] }),
        colorDarkHex = lib.color.hslToHex({ ...props.color.hsl, l: 100 - _range[1] });

    function handleSetRange(value: number | number[]) {
        _setRange(value as ColorLightRange);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => props.onChange(value as ColorLightRange), props.debounce || 800);
    }

    return (
        <>
            <Slider
                value={_range}
                hideValue
                // showTooltip
                className=''
                style={{
                    '--color-stop-bright': colorBrightHex,
                    '--color-stop-dark': colorDarkHex,
                }}
                classNames={{
                    filler: 'bg-gradient-to-r from-[var(--color-stop-bright)] to-[var(--color-stop-dark)]',
                }}
                color="foreground"
                tooltipProps={{
                    placement: 'bottom',
                    style: {
                        '--selected-color': props.color.hex,
                    },
                    classNames: {
                        content: 'bg-[var(--selected-color)]',
                        arrow: 'w-20',
                    },
                    showArrow: false,

                }}
                maxValue={props.max}
                minValue={props.min}
                defaultValue={props.initialValue}
                onChange={handleSetRange}
                label="Color step range"
                size="md"
                renderThumb={(_props) => {

                    const colorHex = _props.index ? colorDarkHex : colorBrightHex;

                    return (
                        <div
                            style={_props.style}
                            className='top-1/2 cursor-pointer'>
                            <Tooltip
                                style={{
                                    '--nextui-primary': lib.color.hslToString(props.color.hsl),
                                    '--color-stop': colorHex,
                                    color: lib.color.getForeground(lib.color.hexToRgb(colorHex)),
                                }}
                                classNames={{
                                    base: 'before:bg-primary',
                                    content: 'bg-[var(--color-stop)] border-2 border-primary',
                                }}

                                placement='bottom'
                                showArrow
                                offset={-2}
                                isOpen={!!_props['data-dragging']}
                                content={<code>{colorHex}</code>}
                                updatePositionDeps={[_props.style]}
                            >
                                <div className="w-8 h-8 p-1 rounded-full bg-background-600">
                                    <div className="w-full h-full rounded-full" style={{ backgroundColor: props.color.hex }}></div>
                                </div>
                            </Tooltip>
                        </div>

                    )
                }}
            ></Slider>
        </>
    )
}

export default AppSlider;