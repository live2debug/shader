import { useRef, useState } from 'react'
import { ColorResult, SketchPicker } from 'react-color'
import lib from '../lib';


type Props = {
    color: ColorResult,
    onChange: (result: ColorResult) => void,
    debounce?: number,
}

const AppColorPicker = (props: Props) => {

    const
        [color, setColor] = useState(props.color),
        timerRef = useRef(0);


    function handleOnChange(result: ColorResult): void {
        
        setColor(result);

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {

            const _color = { ...result, hsl: lib.color.rgbToHsl(result.rgb) };

            props.onChange(_color);

        }, props.debounce || 800);
    }



    return (
        <SketchPicker color={color?.hex} onChange={handleOnChange} />
    )
}

export default AppColorPicker