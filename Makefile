dc := docker-compose
run := ${dc} run --rm

up:
	${dc} up

upd:
	echo "Starting containers... web admin, rabbitmq, es, kibana"
	${dc} up -d
	echo "Waiting for ElasticSearch to start..."
	sleep 10
	echo "Starting BFF..."
	web-player-bff/gradlew bootRun -p web-player-bff > bff.log 2>&1 &
	echo "Starting Consumers..."
	consumers/gradlew bootRun -p consumers > consumers.log 2>&1 &

down:
	${dc} down

build:
	${dc} build

bash-admin:
	${run} admin bash

stop-all:
	${dc} stop $(docker ps -a -q)

tail -f:
	tail -f bff.log consumers.log