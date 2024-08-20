# frontend

This service is a very simple react app so we can train how to instrument frontend apps with Faro and
Frontend Observability.

## Task

The tasks here are:

1. Create a Frontend Observability app in your cloud account
2. introduce Faro Web SDK (hint: copy and paste the instructions from the Frontend O11y new app wizard)
3. add the OpenTelemetry instrumentation to the backing node app

## Verification

You have succeeded, if:

* the Frontend O11y app you created receives data and user sessions are generated as you browse the app
* there are traces that start in the frontend and propagate through backend services

## Hints

Introducing auto-instrumentation into NodeJS apps is _easy_!

Often users are not looking forward to change the application, but just add o11y. With docker,
this can be done in 2 lines added to the Dockerfile.

* [NodeJS auto-instrumentation docs](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node#user-content-usage-auto-instrumentation)

* [Faro React Documentation](https://grafana.com/docs/grafana-cloud/monitor-applications/frontend-observability/instrument/faro-react/v6-no-data-router/)
