dc := docker-compose
dcr := docker-compose run --rm

# Docker tasks
.PHONY: docker-deploy-all
docker-deploy-all: clean build
	$(dc) up --build episodes-consumer podcasts-consumer

.PHONY: docker-deploy
docker-deploy: clean build docker-build
	$(dc) up $(target)

.PHONY: docker-up
docker-up:
	$(dc) up $(target)

.PHONY: docker-build
docker-build: clean assemble
	$(dc) build $(target)

.PHONY: docker-bash
docker-bash:
	$(dc) exec $(target) sh

# Gradle tasks
.PHONY: clean
clean:
	./gradlew clean

.PHONY: assemble
assemble:
	./gradlew assemble


.PHONY: build
build:
	./gradlew build

