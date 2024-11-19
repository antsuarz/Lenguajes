package com.example;
import org.graalvm.polyglot.*;

import java.util.ArrayList;
import java.util.List;

public class App {

    static String MONTECARLO_JS = "(const SEED = 113; function integrate(param) { " +
            "let underCurve = 0;" +
            "    let random = new Math.seedrandom(SEED);" +
            "    for (let count = 0; count < param; count++) {" +
            "        let x = random();" +
            "        let y = random();" +
            "        if (x * x + y * y <= 1.0) {" +
            "            underCurve++;" +
            "        }" +
            "    }" +
            "" +
            "    return (underCurve / param) * 4.0;" +
            "})";

    static String JS_CODE = "(function myFun(param){console.log('Hello ' + param + ' from JS');})";

    public static void main(String[] args) {
        if (args.length == 0) {
            try (Context context = Context.create()) {
                Value value = context.eval("js", MONTECARLO_JS);
                value.execute(5000000);
            }
            return;
        }
        if (args.length<3) {
            System.err.println("I need 1) the max number of iterations 2) the k 3) the CoV.");
            System.exit(-1);
        }
        int maxNumberIterations = Integer.parseInt(args[0]); // 30
        int k = Integer.parseInt(args[1]); // 10
        double CoV = Double.parseDouble(args[2]); // 0.02

        List<Long> executionTimes = new ArrayList<Long>();
        long before, after, time;
        for(int i=1; i<=maxNumberIterations; i++) {
            try (Context context = Context.create()) {
                before = System.currentTimeMillis();
                Value value = context.eval("js", MONTECARLO_JS);
                value.execute(5000000);
                after = System.currentTimeMillis();
                time = after-before;
            }
            System.out.println("Iteration " + i + ", time "+ time);
            executionTimes.add(time);
            if (areWeDone(executionTimes, k, CoV))
                break;
        }
        int result = (int)getMean(executionTimes, k);
    }

    private static boolean areWeDone(List<Long> executionTimes, int k, double CoV) {
        if (executionTimes.size()<k)
            return false;
        double summation = 0;
        long mean = getMean(executionTimes, k);
        for(int i=executionTimes.size()-k; i<executionTimes.size(); i++)
            summation += Math.pow(executionTimes.get(i)-mean, 2);
        double stdDeviation = Math.sqrt(summation / k);
        return stdDeviation / mean < CoV;
    }

    private static long getMean(List<Long> executionTimes, int k) {
        long summation = 0;
        for(int i=executionTimes.size()-k; i<executionTimes.size(); i++)
            summation += executionTimes.get(i);
        return summation / k;
    }

}
