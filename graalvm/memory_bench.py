#!/usr/bin/python
# -*- coding: utf-8 -*- 

from __future__ import print_function, division, absolute_import

import psutil
import numpy as np
import time
from subprocess import Popen, PIPE

def measure_memory(pid):
    """Mide el consumo de memoria (RSS) de un proceso dado."""
    try:
        process = psutil.Process(pid)
        return process.memory_info().rss / (1024 * 1024) 
    except psutil.NoSuchProcess:
        return 0

def measure_system_memory():
    """Mide el consumo total de memoria RAM del sistema."""
    memory = psutil.virtual_memory()
    return memory.used / (1024 * 1024)  

def memory_usage(command, p_iterations):
    memory_usages = [] 
    
    # Medir el uso de memoria del sistema antes de ejecutar el proceso
    system_memory_before = measure_system_memory()

    for i in range(1, p_iterations + 1):
        process = Popen(command, shell=True)
        
        while process.poll() is None:
            process_memory = measure_memory(process.pid) 
            system_memory = measure_system_memory()
 
            memory_usages.append(process_memory) 
            
            time.sleep(0.1)  
        
        process.communicate()
        
        print("Iteration %s completed." % i)
 
    avg_memory = np.mean(memory_usages) if memory_usages else 0 
    return avg_memory
