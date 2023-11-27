dc := docker-compose


.PHONY: docker-build-and-up-all
docker-build-and-up-all: build docker-up

.PHONY: docker-up
docker-up:
	echo "Starting databases"
	${dc} up -d es rabbitmq db
	echo "Starting admin"
	${dc} up -d admin
	echo "Starting bff"
	sleep 10
	${dc} up -d bff
	echo "Starting consumers"
	${dc} up -d episodes-consumer
	${dc} up -d podcasts-consumer
	echo "Starting cortex"
	${dc} up -d cortex

.PHONY: build
build: build-bff build-consumers build-admin

.PHONY: build-admin
build-admin:
	$(dc) build admin

.PHONE: build-bff
build-bff:
	web-player-bff/gradlew clean -p web-player-bff
	web-player-bff/gradlew assemble -p web-player-bff
	$(dc) build bff

.PHONE: build-consumers
build-consumers:
	consumers/gradlew clean -p consumers
	consumers/gradlew assemble -p consumers
	$(dc) build consumers

.PHONY: docker-down
docker-down:
	$(dc) down --remove-orphans

.PHONY: ps
ps:
	docker ps -f name=kelex --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
