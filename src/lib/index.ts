import math from "./math";
import color from "./colorUtil";


function copyToClipboard(text: string) {
    window.navigator.clipboard.writeText(text);
}

export default {
    math,
    color,
    copyToClipboard,
}