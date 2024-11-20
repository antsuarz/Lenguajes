load('montecarlo.js');

function main(...args) {
    if (args.length === 0) {
        console.log("Ejecutando con número predeterminado de muestras (5000000).");
        console.log("Resultado:", integrate(5000000));
        return;
    }

    if (args.length < 3) {
        console.error("Se necesitan los argumentos: 1) Número máximo de iteraciones, 2) k, 3) CoV.");
        process.exit(-1);
    }

    console.log(args)
    const maxNumberIterations = parseInt(args[0], 10);
    const k = parseInt(args[1], 10); 
    const CoV = parseFloat(args[2]); 
    console.log("k valor:",k)
    console.log("CoV. ", CoV)
    const executionTimes = [];
    for (let i = 1; i <= maxNumberIterations; i++) {
        const before = Date.now(); 
        integrate(5000000); 
        const after = Date.now();
        const time = after - before;

        console.log(`Iteración ${i}, tiempo: ${time} ms`);
        executionTimes.push(time);

        if (areWeDone(executionTimes, k, CoV)) break;
    }

    const result = getMean(executionTimes, k);
    console.log("Tiempo promedio de las últimas iteraciones:", result, "ms");
}

function areWeDone(executionTimes, k, CoV) {
    const n = Math.min(executionTimes.length, k);
    if (n < k) return false;

    const mean = getMean(executionTimes, k);
    let summation = 0;

    for (let i = executionTimes.length - n; i < executionTimes.length; i++) {
        summation += Math.pow(executionTimes[i] - mean, 2);
    }

    const stdDeviation = Math.sqrt(summation / n);
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

main(...arguments);