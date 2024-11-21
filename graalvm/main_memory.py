#!/usr/bin/python
# -*- coding: utf-8 -*- 

from __future__ import print_function, division, absolute_import
import memory_bench

def show(avg_memory):
    print("\tAverage memory usage (RSS) of process: {:.2f} MB.".format(avg_memory))

if __name__ == "__main__":
    # Parámetros
    print("------MEMORY USAGE TEST------")
    
    # Ejecutar la función de medición de memoria
    avg_memory = memory_bench.memory_usage("node node-montecarlo-v8.js", 10)
    
    print("Results Steady:")
    show(avg_memory)
    
    avg_memory = memory_bench.memory_usage("node node-montecarlo-v8.js 30 10 0.02", 1)
    
    print("Results Steady:")
    show(avg_memory)