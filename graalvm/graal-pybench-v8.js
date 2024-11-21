const { pybench } = require('./pybench-v8.js');  

function main(...args) {
    if (args.length === 0) { 
        pybench(); 
        return;
    }

    if (args.length < 3) {
        console.error("Se necesitan los argumentos: 1) Número máximo de iteraciones, 2) k, 3) CoV.");
        process.exit(-1);
    }

    const maxNumberIterations = parseInt(args[0], 10);
    const k = parseInt(args[1], 10); 
    const CoV = parseFloat(args[2]);  
    const executionTimes = [];
    
    for (let i = 1; i <= maxNumberIterations; i++) {
        const before = Date.now(); 
        pybench(); 
        const after = Date.now();
        const time = after - before;

        console.log(`Iteracion ${i}, tiempo: ${time} ms`);
        executionTimes.push(time);

        if (areWeDone(executionTimes, k, CoV)) break;
    }

    const result = getMean(executionTimes, k);
    console.log(result)
}

main(...process.argv.slice(2));

function areWeDone(executionTimes, k, CoV) {
    const n = Math.min(executionTimes.length, k);
    if (n < k) return false;

    const mean = getMean(executionTimes, k);
    let summation = 0;

    for (let i = executionTimes.length - n; i < executionTimes.length; i++) {
        summation += Math.pow(executionTimes[i] - mean, 2);
    }

    const stdDeviation = Math.sqrt(summation / n);
    console.log(`Desviación estándar: ${stdDeviation}, CoV: ${stdDeviation / mean}`);
    return stdDeviation / mean < CoV;
}

function getMean(executionTimes, k) {
    const n = Math.min(executionTimes.length, k);
    let summation = 0;

    for (let i = executionTimes.length - n; i < executionTimes.length; i++) {
        summation += executionTimes[i];
    }

    return summation / n;
}
