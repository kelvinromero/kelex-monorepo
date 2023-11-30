FROM python:3.9

ARG OTEL_EXPORTER_OTLP_ENDPOINT
ARG OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED
ARG OTEL_TRACES_EXPORTER
ARG OTEL_METRICS_EXPORTER
ARG OTEL_LOGS_EXPORTER
ARG OTEL_EXPORTER_OTLP_PROTOCOL

ENV OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=$OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED
ENV OTEL_EXPORTER_OTLP_ENDPOINT=$OTEL_EXPORTER_OTLP_ENDPOINT
ENV OTEL_EXPORTER_OTLP_PROTOCOL=$OTEL_EXPORTER_OTLP_PROTOCOL
ENV OTEL_TRACES_EXPORTER=$OTEL_TRACES_EXPORTER
ENV OTEL_METRICS_EXPORTER=$OTEL_METRICS_EXPORTER
ENV OTEL_LOGS_EXPORTER=$OTEL_LOGS_EXPORTER

WORKDIR /src

COPY ./requirements.txt /src/requirements.txt

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

COPY ./app /src/app

RUN opentelemetry-bootstrap --action=install

#CMD ["opentelemetry-instrument", "uvicorn", "app.main:app", "--reload",  "--host", "0.0.0.0", "--port", "80"]
CMD ["opentelemetry-instrument", "uvicorn", "app.main:app",  "--host", "0.0.0.0", "--port", "80"]

# If running behind a proxy like Nginx or Traefik add --proxy-headers
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]