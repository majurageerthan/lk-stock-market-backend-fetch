#!/bin/bash

# git config user.name
# git config user.email
cp .env.local .env
sleep 2
serverless invoke local --function fetchStockDataAndUpdate


# git config user.name "majurageerthan"
# git config user.email "majuran.thasan@gmail.com"
