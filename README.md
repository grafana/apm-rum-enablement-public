# APM and RUM enablement

This repository is used for training purposes. It contains a set of really small services that communicate with each other.

The goal is to enable everyone to understand the value of APM / Application Observability and RUM / Frontend Observability in Grafana Cloud and to exercise on a small scale what needs to be done to properly set up users for success.

## Prerequisites

* a local machine
* docker installed
* a fresh Grafana Cloud stack (to ensure you can follow all the steps)
* to cache the images, use `docker compose pull && docker compose build`

## How to use this repository

1. clone the repository locally
2. pull & build the docker images needed for this exercise (`docker compose build`)
3. start the app (`docker compose up -d`)
4. browse `http://localhost:8000/`
5. make changes to a service, rebuild and restart (`docker compose up -d`)
