target := bff
dc := docker-compose
dcr := docker-compose run --rm
dce := docker-compose exec

.PHONY: docker-up
docker-up: clean assemble docker-build
	$(dc) up es -d
	sleep 10
	$(dc) up bff

.PHONY: docker-build
docker-build:
	$(dc) build bff

.PHONY: docker-bash
docker-bash:
	$(dce) bff sh

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
	./gradlew bootRun
