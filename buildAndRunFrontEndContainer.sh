imageName="node"
containerName="hot-pot-flashcards-container"

docker build -t $imageName -f ./front-end/Dockerfile ./front-end/

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -d -p 3000:3000 --name $containerName $imageName