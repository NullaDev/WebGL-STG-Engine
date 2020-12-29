import { Sprite_Mode } from "../stg/util/sprites";
import { scrCoord_to_GLCoord_x, scrCoord_to_GLCoord_y } from "./Screen";

const vertexCode = `
attribute vec2 coord;
attribute vec2 tex;
attribute float alpha;
varying highp vec2 vTexCoord;
varying highp float vTexAlpha;
void main() {
    gl_Position = vec4(coord, 0.0, 1.0);
    vTexCoord = tex;
    vTexAlpha = alpha;
}
`;

const fragmentCode = `
precision highp float;
varying highp vec2 vTexCoord;
varying highp float vTexAlpha;
uniform sampler2D uSampler;
void main() {
    vec4 col = texture2D(uSampler, vTexCoord);
    col.a *= vTexAlpha;
    col.rgb *= col.a;
    gl_FragColor = col;
}
`;

export const global_gl = {
    gl: <any>null,
    shader: {
        program: 0,
        attribute: {
            coord: 0,
            tex: 0,
            alpha: 0
        },
        uniform: {
            uSampler: 0,
        },
    }
}

export function setup() {
    var canvas: any = document.getElementById('glcanvas');
    var gl = canvas.getContext('webgl');
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    global_gl.gl = gl;
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertShader, vertexCode);
    gl.shaderSource(fragShader, fragmentCode);
    gl.compileShader(vertShader);
    gl.compileShader(fragShader);
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    const shader = global_gl.shader;
    shader.program = shaderProgram;
    shader.attribute.coord = gl.getAttribLocation(shaderProgram, 'coord');
    shader.attribute.tex = gl.getAttribLocation(shaderProgram, 'tex');
    shader.attribute.alpha = gl.getAttribLocation(shaderProgram, 'alpha');
    shader.uniform.uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');

    gl.enable(gl.BLEND);
    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);
}

export function setMode(mode: Sprite_Mode) {
    const gl = global_gl.gl;
    if (mode == Sprite_Mode.Overlay)
        gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    else
        gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
}

export function loadImage(src: string) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

export function draw(ver_arr: Float32Array, tex_arr: Float32Array, alp_arr: Float32Array, texture: any, size: number) {
    const gl = global_gl.gl;

    const ver_buffer = gl.createBuffer();
    const coord = global_gl.shader.attribute.coord;
    gl.bindBuffer(gl.ARRAY_BUFFER, ver_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, ver_arr, gl.STATIC_DRAW);
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    const tex_buffer = gl.createBuffer();
    const tex = global_gl.shader.attribute.tex;
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, tex_arr, gl.STATIC_DRAW);
    gl.vertexAttribPointer(tex, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(tex);

    const alp_buffer = gl.createBuffer();
    const alp = global_gl.shader.attribute.alpha;
    gl.bindBuffer(gl.ARRAY_BUFFER, alp_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, alp_arr, gl.STATIC_DRAW);
    gl.vertexAttribPointer(alp, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(alp);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(global_gl.shader.uniform.uSampler, 0);

    gl.drawArrays(gl.TRIANGLES, 0, size);
}

export function loadTexture(image: any, interpolate = true, wrap = false) {
    const gl = global_gl.gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_SHORT_4_4_4_4, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, interpolate ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, interpolate ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap ? gl.REPEAT : gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap ? gl.REPEAT : gl.CLAMP_TO_EDGE);
    return texture;
}

export function clear() {
    const gl = global_gl.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
}

const verx = [-1, -1, 1, -1, 1, 1];
const very = [-1, 1, 1, -1, -1, 1];
const texx = [0, 0, 1, 0, 1, 1];
const texy = [0, 1, 1, 0, 0, 1];

function scrCoord_to_GLCoord(fa: Float32Array) {
    for (var i = 0; i < fa.length / 2; i++) {
        fa[i * 2] = scrCoord_to_GLCoord_x(fa[i * 2]);
        fa[i * 2 + 1] = scrCoord_to_GLCoord_y(fa[i * 2 + 1]);
    }
}

export function drawRects(xyrwh: Float32Array, size: number, texture: any) {
    const ver = new Float32Array(size * 12);
    const tex = new Float32Array(size * 12);
    const alp = new Float32Array(size * 6);
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < 6; j++) {
            const a = xyrwh[i * 10 + 2];
            const w = xyrwh[i * 10 + 3] * verx[j];
            const h = xyrwh[i * 10 + 4] * very[j];
            ver[i * 12 + j * 2 + 0] = xyrwh[i * 10 + 0] + w * Math.cos(a) - h * Math.sin(a);
            ver[i * 12 + j * 2 + 1] = xyrwh[i * 10 + 1] + w * Math.sin(a) + h * Math.cos(a);
            tex[i * 12 + j * 2 + 0] = xyrwh[i * 10 + 5] + texx[j] * xyrwh[i * 10 + 7];
            tex[i * 12 + j * 2 + 1] = xyrwh[i * 10 + 6] + texy[j] * xyrwh[i * 10 + 8];
            alp[i * 6 + j] = xyrwh[i * 10 + 9];
        }
    }
    scrCoord_to_GLCoord(ver);
    draw(ver, tex, alp, texture, size * 6);
}

export type Snake = {
    w: number, len: number[], tx: number, ty: number, tw: number, th: number
}

function fillSnake(ver: Float32Array,
    ind: number, o: number, i: number,
    px: number, py: number,
    ox0: number, oy0: number,
    ox1: number, oy1: number) {
    const st = ind * 2 + i * 4;
    const en = ind * 2 + (o - 1) * 8 - (i + 1) * 4;
    ver[st + 0] = ox0;
    ver[st + 1] = oy0;
    ver[en + 0] = ox1;
    ver[en + 1] = oy1;
    if (i == 0) {
        if (st > 0) {
            ver[st - 2] = ox0;
            ver[st - 1] = oy0;
        }
        ver[en + 2] = ver[st + 0];
        ver[en + 3] = ver[st + 1];
        ver[en + 4] = ver[st + 0];
        ver[en + 5] = ver[st + 1];
    } else if (i == o - 2) {
        ver[st - 2] = px;
        ver[st - 1] = py;
        ver[en + 2] = px;
        ver[en + 3] = py;
        ver[st + 2] = ver[en + 0];
        ver[st + 3] = ver[en + 1];
    } else {
        ver[st - 2] = px;
        ver[st - 1] = py;
        ver[en + 2] = px;
        ver[en + 3] = py;
    }
}

export function drawSnake(xy: Float32Array, obj: Snake[], texture: any) {
    const size = obj.reduce((n, e) => e.len.reduce((m, x) => m + (x - 1) * 4 + 2, n), 0);
    const ver = new Float32Array(size * 2);
    const tex = new Float32Array(size * 2);
    const alp = new Float32Array(size);
    const len = new Float32Array(obj.reduce((n, e) => e.len.reduce((m, x) => Math.max(m, x), n), 0));
    var ind_xy = 0;
    var ind_ver = 0;
    for (var os of obj) {
        for (var o of os.len) {
            var tot = 0;
            for (var i = 0; i < o - 1; i++) {
                const px = xy[ind_xy * 2 + i * 2];
                const py = xy[ind_xy * 2 + i * 2 + 1];
                const nx = xy[ind_xy * 2 + i * 2 + 2];
                const ny = xy[ind_xy * 2 + i * 2 + 3];
                const ox = (px + nx) / 2;
                const oy = (py + ny) / 2;

                const l = Math.sqrt((nx - px) * (nx - px) + (ny - py) * (ny - py));
                len[i] = l;
                tot += l;

                fillSnake(ver, ind_ver, o, i,
                    px, py,
                    ox - (oy - py) / l * os.w,
                    oy + (ox - px) / l * os.w,
                    ox + (oy - py) / l * os.w,
                    oy - (ox - px) / l * os.w
                );
            }
            tot -= len[0] / 2 + len[o - 2] / 2;
            var sta = -len[0] / 2;
            for (var i = 0; i < o - 1; i++) {
                fillSnake(tex, ind_ver, o, i,
                    os.tx + os.tw * sta / tot, os.ty + os.th / 2,
                    os.tx + os.tw * (sta + len[i] / 2) / tot, os.ty,
                    os.tx + os.tw * (sta + len[i] / 2) / tot, os.ty + os.th);
                sta += len[i];
            }
            ind_xy += o;
            ind_ver += (o - 1) * 4 + 2;
        }
    }
    for (var i = 0; i < size; i++)
        alp[i] = 1;

    scrCoord_to_GLCoord(ver);

    const gl = global_gl.gl;
    const ver_buffer = gl.createBuffer();
    const coord = global_gl.shader.attribute.coord;
    gl.bindBuffer(gl.ARRAY_BUFFER, ver_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, ver, gl.STATIC_DRAW);
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    const tex_buffer = gl.createBuffer();
    const texc = global_gl.shader.attribute.tex;
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, tex, gl.STATIC_DRAW);
    gl.vertexAttribPointer(texc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texc);

    const alp_buffer = gl.createBuffer();
    const alpc = global_gl.shader.attribute.alpha;
    gl.bindBuffer(gl.ARRAY_BUFFER, alp_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, alp, gl.STATIC_DRAW);
    gl.vertexAttribPointer(alpc, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(alpc);


    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(global_gl.shader.uniform.uSampler, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, size - 2);

}