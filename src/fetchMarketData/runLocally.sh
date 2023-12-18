#!/bin/bash

cp .env.local .env
sleep 2
serverless invoke local --function fetchStockDataAndUpdate
