
async function main() {
    setup();
    const image = await loadImage("assets/blend_test.png");
    const texture = loadTexture(image);
    clear();

    var size = 10000;
    var xyrwh = new Float32Array(size * 9);
    for (var i = 0; i < size; i++) {
        xyrwh[i * 9 + 0] = Math.random() * 2 - 1;
        xyrwh[i * 9 + 1] = Math.random() * 2 - 1;
        xyrwh[i * 9 + 2] = Math.random() * 2 * Math.PI;
        xyrwh[i * 9 + 3] = 0.03;
        xyrwh[i * 9 + 4] = 0.03;
        xyrwh[i * 9 + 5] = 0;
        xyrwh[i * 9 + 6] = 0;
        xyrwh[i * 9 + 7] = 1;
        xyrwh[i * 9 + 8] = 1;
    }

    var t0 = + new Date();
    drawRects(xyrwh, size, texture);
    var t1 = + new Date();
    console.log(t1 - t0);
}

window.onload = main;