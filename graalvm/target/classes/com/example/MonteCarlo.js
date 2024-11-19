const SEED = 113;

function integrate(numSamples) {
    let underCurve = 0;

    // Crear una función para generar números pseudoaleatorios con la semilla
    let random = new Math.seedrandom(SEED);

    for (let count = 0; count < numSamples; count++) {
        let x = random();
        let y = random();

        if (x * x + y * y <= 1.0) {
            underCurve++;
        }
    }

    return (underCurve / numSamples) * 4.0;
}
