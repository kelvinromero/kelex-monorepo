# syntax=docker/dockerfile:1
FROM alpine:3.16.0
RUN apk add --no-cache java-cacerts openjdk17-jdk

ARG OTEL_TRACES_EXPORTER
ARG OTEL_METRICS_EXPORTER
ARG OTEL_LOGS_EXPORTER
ARG OTEL_SERVICE_NAME
ARG OTEL_EXPORTER_OTLP_ENDPOINT
ARG OTEL_INSTRUMENTATION_COMMON_PEER_SERVICE_MAPPING
ARG OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS

ENV OTEL_EXPORTER_OTLP_ENDPOINT=$OTEL_EXPORTER_OTLP_ENDPOINT
ENV OTEL_TRACES_EXPORTER=$OTEL_TRACES_EXPORTER
ENV OTEL_METRICS_EXPORTER=$OTEL_METRICS_EXPORTER
ENV OTEL_LOGS_EXPORTER=$OTEL_LOGS_EXPORTER
ENV JAVA_TOOL_OPTIONS="-javaagent:opentelemetry-javaagent.jar"

COPY ./build/libs/*SNAPSHOT.jar app.jar
COPY ./lib/opentelemetry-javaagent.jar opentelemetry-javaagent.jar

ENTRYPOINT ["java", "-jar", "app.jar"]