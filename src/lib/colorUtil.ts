import { ColorResult } from "react-color";
import lib from ".";



type ColorMapPredicate<T> = (o: {
    shadeKey: number,
    shadeIndex: number,
    totalShade: number,
    hsl: ColorHSL, hex:
    ColorHEX, foreground: ColorHEX
}) => T;



function forEachShade<T>(color: ColorResult, range: ColorLightRange, predicate: ColorMapPredicate<T>): T[] {
    return [.5, 1, 2, 3, 4, 5, 6, 7, 8, 9,].map((v, shadeIndex, a) => {

        const
            hsl = { ...color.hsl, l: 100 - lib.math.lerp(shadeIndex / a.length, range[0], range[1]) },
            hex = hslToHex(hsl),
            foreground = getForeground(hslToRgb(hsl));

        return predicate({
            foreground,
            hex,
            hsl,
            shadeIndex,
            shadeKey: v * 100,
            totalShade: a.length,
        });
    });
}



function rgbToString({ r, g, b }: ColorRGB): string {
    return `${r} ${g} ${b}`;
}


function hslToString({ h, s, l }: ColorHSL): string {
    return `${h} ${s}% ${l}%`
}


function rgbToHsl({ r, g, b }: ColorRGB): ColorHSL {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number = 0, s: number;
    const l: number = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
                break;
            case g:
                h = ((b - r) / d + 2) * 60;
                break;
            case b:
                h = ((r - g) / d + 4) * 60;
                break;
        }
    }

    return ({
        h,
        s: s * 100,
        l: l * 100
    }); // h in [0, 360], s and l in [0, 100]
}




function rgbToHslString(rgb: ColorRGB): string {
    return hslToString(rgbToHsl(rgb));
}



function hslToRgb({ h, s, l }: ColorHSL): ColorRGB {
    s /= 100; // Convert percentage to a fraction
    l /= 100; // Convert percentage to a fraction

    let r: number, g: number, b: number;

    if (s === 0) {
        // Achromatic (gray)
        r = g = b = l; // Convert lightness to ColorRGB
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const hue2rgb = (p: number, q: number, t: number): number => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        r = hue2rgb(p, q, h / 360 + 1 / 3);
        g = hue2rgb(p, q, h / 360);
        b = hue2rgb(p, q, h / 360 - 1 / 3);
    }

    return ({
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    });
}



function hslToRgbString(hsl: ColorHSL): string {
    return rgbToString(hslToRgb(hsl));
}



function rgbToHex({ r, g, b }: ColorRGB): ColorHEX {
    const toHex = (value: number) => {
        const hex = value.toString(16).padStart(2, '0');
        return hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}




function hexToRgb(hex: string): ColorRGB {
    if (hex[0] === '#') hex = hex.slice(1);

    const
        num = Number.parseInt(hex, 16),

        b = num & 255,
        g = (num >> 8) & 255,
        r = (num >> 16) & 255;

    return ({ r, g, b });
}


function hslToHex(hsl: ColorHSL): ColorHEX {
    return rgbToHex(hslToRgb(hsl));
}


function getForeground(rgb: ColorRGB): ColorHEX {

    const avg = (rgb.r + rgb.g + rgb.b) / 3;

    if (avg > 130) return '#000000';
    return '#ffffff';
}



export default {
    rgbToString,
    hslToString,

    rgbToHsl,
    rgbToHslString,

    hslToRgb,
    hslToRgbString,

    rgbToHex,
    hexToRgb,

    hslToHex,

    getForeground,

    forEachShade,
}