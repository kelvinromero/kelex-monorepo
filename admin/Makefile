dc := docker-compose
srv := run web
run := ${dc} ${srv}

upd:
	${dc} up -d

down:
	${dc} down

build:
	${dc} up --build

bundle:
	${run} bundle install
	${dc} up --build

guard:
	${run} bundle exec guard -p

bash:
	${run} bash

rspec:
	${run} bundle exec rspec $(f)

migrate:
	${run} rails db:migrate

seed:
	${run} rails db:seed

setup:
	make build
	make migrate
	make seed
