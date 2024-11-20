const SEED = 113;


function pseudoRandom(seed) { 
    let state = seed;
    return function () {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

function integrate(numSamples) {
    let underCurve = 0;
    let random = pseudoRandom(SEED);

    for (let count = 0; count < numSamples; count++) {
        let x = random();
        let y = random();

        if (x * x + y * y <= 1.0) {
            underCurve++;
        }
    }
    return (underCurve / numSamples) * 4.0;
}
 