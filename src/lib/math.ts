function lerp(normal: number, min: number, max: number): number {
    return max * normal + (1 - normal) * min;
}



export default {
    lerp,
}