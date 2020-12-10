const wasm = require("webassembly");

async function test(){
	const file = await wasm.load("src/bin/test.wasm");
	console.log("1 + 2 = "+ file.exports.add(1,2));
}

test();