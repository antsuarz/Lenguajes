function piWallis(n) {
    let pi = 2.0;
    for (let i = 1; i < n; i++) {
        const left = (2.0 * i) / (2.0 * i - 1);
        const right = (2.0 * i) / (2.0 * i + 1);
        pi *= left * right;
    }
    return pi;
}
 
function fibonacciRecursive(n) {
    function fibonacci(num) {
        if (num <= 1) return 1;
        return fibonacci(num - 1) + fibonacci(num - 2);
    }

    for (let i = 1; i < n; i++) {
        fibonacci(i);
    }
}
 
function fibonacciIterative(n) {
    let first = 0, second = 1;
    for (let i = 1; i < n; i++) {
        [first, second] = [second, first + second];
    }
}
 
function multiplyMatrices(size) {
    const A = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random()));
    const B = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random()));
    const C = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            C[i][j] = 0;
            for (let k = 0; k < size; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}
 
function benchmarks() { 
    piWallis(2 ** 21 + 2 ** 20);
    fibonacciRecursive(2 ** 5 + 2 ** 2 + 2 + 1);
    fibonacciIterative(2 ** 19 + 2 ** 18);
    multiplyMatrices(2 ** 9);
}
 
function pybench() { 
    benchmarks();
}