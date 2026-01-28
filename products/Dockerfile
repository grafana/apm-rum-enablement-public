# syntax=docker/dockerfile:1.4@sha256:9ba7531bd80fb0a858632727cf7a112fbfd19b17e94c4e84ced81e24ef1a0dbc
FROM --platform=$BUILDPLATFORM python:3.10-alpine@sha256:3b1a395c333e4699c8d6344199ade55395f3376a9b63ea4a2260dd97a17c72be

EXPOSE 8002

WORKDIR /app

COPY requirements.txt /app
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /app

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl - v localhost:8002/health" ]

ENTRYPOINT ["python3"]
CMD ["app.py"]
