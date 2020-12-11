
async function main() {
    setup();
    const image = await loadImage("assets/blend_test.png");
    const texture = loadTexture(image);
    clear();
    
    var size = 10000;
    var px = [], py = [], dir = [];
    for(var i=0;i<size;i++){
        px.push(Math.random()*2-1);
        py.push(Math.random()*2-1);
        dir.push(Math.random()*2*Math.PI);
    }
    
    var t0 = + new Date();
    drawRects(px, py, 0.1, dir, size, 0, 0, 1, 1, texture);
    var t1 = + new Date();

    console.log(t1-t0);
}

window.onload = main;