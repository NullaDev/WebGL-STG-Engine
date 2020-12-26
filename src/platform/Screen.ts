import { GLHelper } from "./gl_ui";

export const SCR_HALF_WIDTH = 192;
export const SCR_HALF_HEIGHT = 224;

export const SCR_HALF_WIN_WIDTH = 360;
export const SCR_HALF_WIN_HEIGHT = 240;

export const SCR_SCENE_MARGIN = 16;

export function scrCoord_to_GLCoord_x(x: number) {
    return x / SCR_HALF_WIN_WIDTH;
}

export function scrCoord_to_GLCoord_y(y: number) {
    return y / SCR_HALF_WIN_HEIGHT;
}

const magn = 1 / 64;

export function renderSceneBG(helper: GLHelper) {
    helper.rect([
        -SCR_HALF_WIDTH,
        -SCR_HALF_HEIGHT,
        SCR_HALF_WIDTH * 2,
        SCR_HALF_HEIGHT * 2
    ], magn);
}

export function renderUIBG(helper: GLHelper) {
    const rect = (a: number[]) => helper.rect(a, magn);

    rect([
        -SCR_HALF_WIDTH,
        SCR_HALF_WIN_HEIGHT - SCR_SCENE_MARGIN,
        SCR_HALF_WIDTH * 2,
        SCR_SCENE_MARGIN
    ]);

    rect([
        -SCR_HALF_WIDTH,
        -SCR_HALF_WIN_HEIGHT,
        SCR_HALF_WIDTH * 2,
        SCR_SCENE_MARGIN
    ]);

    rect([
        -SCR_HALF_WIN_WIDTH,
        -SCR_HALF_WIN_HEIGHT,
        SCR_HALF_WIN_WIDTH - SCR_HALF_WIDTH,
        SCR_HALF_WIN_HEIGHT * 2,
    ]);

    rect([
        SCR_HALF_WIDTH,
        -SCR_HALF_WIN_HEIGHT,
        SCR_HALF_WIN_WIDTH - SCR_HALF_WIDTH,
        SCR_HALF_WIN_HEIGHT * 2,
    ]);
}