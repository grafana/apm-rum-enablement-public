# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM python:3.14-alpine@sha256:05b2b8b732ecd268fee8727a369f936f022d1321b59befd13c30ede22769dcdc

EXPOSE 8002

WORKDIR /app

COPY requirements.txt /app
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /app

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl - v localhost:8002/health" ]

ENTRYPOINT ["python3"]
CMD ["app.py"]
