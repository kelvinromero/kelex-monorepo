FROM python:3.9

ARG OTEL_EXPORTER_OTLP_ENDPOINT

ENV OTEL_EXPORTER_OTLP_ENDPOINT=$OTEL_EXPORTER_OTLP_ENDPOINT
ENV OTEL_EXPORTER_OTLP_PROTOCOL=grpc

WORKDIR /src

COPY ./requirements.txt /src/requirements.txt

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

COPY ./app /src/app

#CMD ["opentelemetry-instrument", "uvicorn", "app.main:app", "--reload",  "--host", "0.0.0.0", "--port", "80"]
CMD ["opentelemetry-instrument", "uvicorn", "app.main:app",  "--host", "0.0.0.0", "--port", "80"]

# If running behind a proxy like Nginx or Traefik add --proxy-headers
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]