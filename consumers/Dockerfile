FROM adoptopenjdk/openjdk16:alpine

ARG OTEL_EXPORTER_OTLP_ENDPOINT

ENV OTEL_EXPORTER_OTLP_ENDPOINT=$OTEL_EXPORTER_OTLP_ENDPOINT
ENV OTEL_TRACES_EXPORTER=otlp
ENV OTEL_METRICS_EXPORTER=otlp
ENV OTEL_LOGS_EXPORTER=otlp

COPY ./build/libs/*SNAPSHOT.jar app.jar
COPY ./lib/opentelemetry-javaagent.jar opentelemetry-javaagent.jar

ENTRYPOINT ["java", "-javaagent:opentelemetry-javaagent.jar", "-jar", "app.jar", "--spring.profiles.active=episodes,receiver"]