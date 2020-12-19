export const SCR_HALF_WIDTH = 250;
export const SCR_HALF_HEIGHT = 250;

export const SCR_HALF_WIN_WIDTH = 250;
export const SCR_HALF_WIN_HEIGHT = 250;

export function scrCoord_to_GLCoord_x(x: number) {
    return x / SCR_HALF_WIN_WIDTH;
}

export function scrCoord_to_GLCoord_y(y: number) {
    return y / SCR_HALF_WIN_HEIGHT;
}