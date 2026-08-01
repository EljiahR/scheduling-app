#!/bin/bash
WEB=$(lsof -ti :3000)
SERVER=$(lsof -ti :5032)

if [ -n "$WEB" ]; then
    kill $WEB
fi

if [ -n "$SERVER" ]; then
    kill $SERVER
fi