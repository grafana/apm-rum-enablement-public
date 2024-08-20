const { trace }  = require("@opentelemetry/api");

module.exports = function (app) {
    app.use(function (req, res, next) {
      // set traceparent header
      const traceId = trace.getActiveSpan()?.spanContext()?.traceId ?? '00000';
      const spanId = trace.getActiveSpan()?.spanContext()?.spanId ?? '00000';

      res.setHeader("server-timing", `traceparent;desc="00-${traceId}-${spanId}-01"`);
      next();
    });
};
