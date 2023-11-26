dc := docker-compose
svrun := run web
run := ${dc} ${svrun}

up:
	${dc} up

upd:
	${dc} up -d

down:
	${dc} down

build:
	${dc} build

bundle:
	${run} bundle install
	${dc} up --build

bash:
	${run} bash

test:
	${run} bundle exec rspec

lint:
	${run} rubocop -a

migrate:
	${run} rails db:migrate

seed:
	${run} rails db:seed

setup:
	make build
	make migrate
	make seed
	make up

ps:
	${dc} ps