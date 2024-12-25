git pull origin main

cp ../.env .env

docker stop xeditor-frontend
docker rm xeditor-frontend
docker image rm xeditor-frontend
docker build -t xeditor-frontend .
docker run --name xeditor-frontend -d -p 80:80 xeditor-frontend

