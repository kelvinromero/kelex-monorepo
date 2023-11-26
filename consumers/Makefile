target := consumers
dc := docker-compose
dcr := docker-compose run --rm

.PHONY: docker-up
docker-up: clean assemble docker-build
	$(dc) up $(target)

.PHONY: docker-build
docker-build:
	$(dc) build $(target)

.PHONY: docker-bash
docker-bash:
	$(dc) exec $(target) sh

.PHONY: clean
clean:
	./gradlew clean

.PHONY: assemble
assemble:
	./gradlew assemble


.PHONY: build
build:
	./gradlew build

.PHONY: run
run:
	./gradlew bootRun --args='--spring.profiles.active=episodes,receiver'
