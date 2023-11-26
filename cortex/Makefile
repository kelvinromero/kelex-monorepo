target := cortex
dc := docker compose
dce := docker compose exec

.PHONY: docker-build
docker-build:
	$(dc) build $(target)

.PHONY: docker-up
docker-up: docker-build
	$(dc) up $(target)

.PHONY: docker-upd
docker-upd:
	$(dc) up -d $(target)

.PHONY: docker-bash
docker-bash: docker-upd
	$(dce) $(target) bash

.PHONY: docker-down
docker-down:
	$(dc) down $(target)