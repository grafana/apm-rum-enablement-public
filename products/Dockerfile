# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM python:3.10-alpine

EXPOSE 8002

WORKDIR /app

COPY requirements.txt /app
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /app

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl - v localhost:8002/health" ]

ENTRYPOINT ["python3"]
CMD ["app.py"]
