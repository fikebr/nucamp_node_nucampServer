@echo off
title MongoDB Server
set mongod="e:\Program Files\dev\MongoDB\Server\4.2\bin\mongod.exe"
cd /d E:\Dropbox\Dev\Projects\NucampFolder\5-NodeJS-Express-MongoDB\mongodb
%mongod% --dbpath=data