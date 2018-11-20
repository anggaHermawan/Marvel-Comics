echo == Prepare working folder ==

WORKING_FOLDER="./marvel-comics/"

if [ -d "$WORKING_FOLDER" ]; then
  # Control will enter here if $WORKING_FOLDER exists.
  rm -R $WORKING_FOLDER
fi

echo == Stop and remove existing container ==

name="marvel-comics"

if [ "$(docker ps -q -f name=$name)" ]; then
    # stop
    docker stop $name
fi

if [ "$(docker ps -aq -f status=exited -f name=$name)" ]; then
    # cleanup
    docker rm $name
fi

WORKING_FOLDER="./marvel-comics/"

if [ -d "$WORKING_FOLDER" ]; then
  # Control will enter here if $WORKING_FOLDER exists.
  rm -R $WORKING_FOLDER
fi

echo == Git Clone branch master ==

git clone -b master https://github.com/anggaHermawan/Marvel-Comics.git

echo == Build and  run docker image ==
cd Marvel-Comics
docker build -f Dockerfile -t "marvel-comics" .
docker tag marvel-comics marvel-comics:latest
docker create --name marvel-comics -p 13000:3000 marvel-comics
docker start marvel-comics

echo == Done, please check http://ip-address:13000 ==
