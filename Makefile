dc := docker-compose
run := ${dc} run --rm

docker-up:
	${dc} up

docker-down:
	${dc} down

docker-build:
	${dc} build

docker-bash-admin:
	${run} admin bash

docker-stop-all:
	${dc} stop $(docker ps -a -q)