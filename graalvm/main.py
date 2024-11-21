#!/usr/bin/python
# -*- coding: utf-8 -*-

from __future__ import print_function, division, absolute_import

import bench

def show(interval, mean, sdev, error_percentage):
    print("\tInterval: {}.".format(interval))
    print("\tMean: {}.".format(mean))
    print("\tStandard deviation: {}.".format(sdev))
    print("\tError percentage: {:.2f}%.".format(error_percentage))

if __name__ == "__main__":
    # Parameters
    print("------STARTUP------")
    interval, mean, sdev, error_percentage = bench.startup("node node-hash-v8.js", 0.95, 10, 0)
    print("Results Startup:")
    show(interval, mean, sdev, error_percentage)

    print("------STEADY-STATE------")
    interval, mean, sdev, error_percentage = bench.steady("node node-hash-v8.js", 0.95, 10, 0, 30, 10, 0.02)
    print("Results Steady-state:")
    show(interval, mean, sdev, error_percentage)

