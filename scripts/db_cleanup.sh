#!/bin/bash
DB=$(ls ./SchedulingServer/ | grep "employees.db")

if [ -n "$DB" ]; then
    for file in $DB; do
        rm ./SchedulingServer/$file
    done
fi