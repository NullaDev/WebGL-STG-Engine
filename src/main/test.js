const wasm = require("webassembly");

async function test(){
	const file = await wasm.load("src/bin/test.wasm", {
		imports: {
			"consoleLog" : (a,b)=>console.log(`${a} + ${b} = `)
		}
	});
	console.log(file.exports.add(1,2));
}

test();