#include <webassembly.h>

extern void consoleLog(int va, int vb);

export int add(int a, int b){
    consoleLog(a,b);
    return a+b;
}