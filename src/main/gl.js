const vertexCode = `
attribute vec2 coord;
attribute vec2 tex;
varying highp vec2 vTexCoord;
void main(void) {
    gl_Position = vec4(coord, 0.0, 1.0);
    vTexCoord = tex;
}
`;

const fragmentCode = `
varying highp vec2 vTexCoord;
uniform sampler2D uSampler;
void main(void) {
    gl_FragColor = texture2D(uSampler, vTexCoord);
}
`;

const global_gl = {
    gl: null,
    shader: {
        program: 0,
        attribute: {
            coord: 0,
            tex: 0,
        },
        uniform: {
            uSampler: 0,
        },
    }
}

function setup() {
    var canvas = document.getElementById('glcanvas');
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
    shader.uniform.uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');

    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

function draw(ver_arr, tex_arr, texture, size) {
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

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(global_gl.shader.uniform.uSampler, 0);

    gl.drawArrays(gl.TRIANGLES, 0, size);
}

function loadTexture(image) {
    const gl = global_gl.gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_SHORT_4_4_4_4, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);
    return texture;
}

function clear() {
    const gl = global_gl.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
}

const verang = [3, -3, -1, 3, 1, -1];
const texx = [0, 0, 1, 0, 1, 1];
const texy = [0, 1, 1, 0, 0, 1];

function drawRects(px, py, pr, dir, size, tx, ty, tw, th, texture) {
    const ver = new Float32Array(size * 12);
    const tex = new Float32Array(size * 12);
    const pid4 = Math.PI / 4;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < 6; j++) {
            ver[i * 12 + j * 2 + 0] = px[i] + pr * Math.cos(dir[i] + verang[j] * pid4);
            ver[i * 12 + j * 2 + 1] = py[i] + pr * Math.sin(dir[i] + verang[j] * pid4);
            tex[i * 12 + j * 2 + 0] = tx + texx[j] * tw;
            tex[i * 12 + j * 2 + 1] = ty + texy[j] * th;
        }
    }
    draw(ver, tex, texture, size * 6);
}