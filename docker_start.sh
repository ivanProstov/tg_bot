#!/bin/bash

docker stop tg_bot
docker rm tg_bot

docker build -t tg_bot_image .

docker run -d -p 3002:3000 --name tg_bot tg_bot_image