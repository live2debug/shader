import { useMemo } from "react";
import lib from "../lib";

type Props = {
    scale: number,
    color1: ColorHEX,
    color2: ColorHEX,
    color3: ColorHEX,
}

const AppLogo = ({ color1, color2, color3, scale }: Props) => {
    return (
        <svg
            width={`${128 * scale}px`}
            height={`${128 * scale}px`}
            viewBox="0 0 30.363726 30.315935"
            version="1.1"
            id="svg1"
            xmlns="http://www.w3.org/2000/svg">
            <defs
                id="defs1" />
            <g
                id="layer1"
                transform="translate(-99.657188,-78.825142)">
                <g
                    id="g9">
                    <rect
                        fill={color1}
                        id="rect2"
                        width="17.797602"
                        height="17.797602"
                        x="112.22331"
                        y="91.343475"
                        ry="3.628"
                        rx="3.628" />
                    <rect
                        fill={color2}
                        id="rect3"
                        width="17.797602"
                        height="17.797602"
                        x="99.657188"
                        y="78.825142"
                        ry="3.628"
                        rx="3.628" />
                    <rect
                        fill={color3}
                        id="rect1"
                        width="17.797602"
                        height="17.797602"
                        x="105.77302"
                        y="84.940971"
                        ry="3.628"
                        rx="3.628" />
                </g>
            </g>
        </svg>
    )
}

export default AppLogo;


export function DefaultAppLogo({ rgb }: { scale?: number, rgb: ColorRGB }) {

    const colors = useMemo(() => {
        const hsl = lib.color.rgbToHsl(rgb);

        return ({
            c1: lib.color.hslToHex({ ...hsl, l: 30 }),
            c2: lib.color.rgbToHex(rgb),
            c3: lib.color.hslToHex({ ...hsl, l: 77 }),
        })
    }, [rgb]);

    return (
        <AppLogo scale={.34} color1={colors.c1} color2={colors.c2} color3={colors.c3} />
    )
}