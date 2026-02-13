# syntax=docker/dockerfile:1.4@sha256:9ba7531bd80fb0a858632727cf7a112fbfd19b17e94c4e84ced81e24ef1a0dbc
FROM --platform=$BUILDPLATFORM python:3.10-alpine@sha256:bd2fa681267f342f3b4200644810de5ee7832dda613a375fa9fcf42ac9387fbe

EXPOSE 8002

WORKDIR /app

COPY requirements.txt /app
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /app

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl - v localhost:8002/health" ]

ENTRYPOINT ["python3"]
CMD ["app.py"]
