#!/usr/bin/env python2

import ephem
import socket
import sys
from contextlib import contextmanager
from time import gmtime, strftime


def doppler(frequnecy,time_stamps,latitude,longitude,altitude,TLE_file):
    loc = ephem.Observer()
    loc.lon = longitude
    F0 = frequency
    loc.lat = latitude 
    loc.elevation = altitude
    loc.date = time_stamps
    with open(TLE_file, 'r') as f:
        data = f.readlines()
    sat = ephem.readtle(data[0], data[1], data[2])
    sat.compute(loc)
    doppler = int(F0 - sat.range_velocity * F0 / C)
    return doppler

C = 300000000

doppler_shift = doppler(frequency,time_stamps,latitude,longitude,altitude,TLE_file)


