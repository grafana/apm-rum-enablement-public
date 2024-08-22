const { trace }  = require("@opentelemetry/api");

function nonBlockingDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = function (app) {
    app.use(async function (req, res, next) {
        // set traceparent header
        const traceId = trace.getActiveSpan()?.spanContext()?.traceId ?? '00000';
        const spanId = trace.getActiveSpan()?.spanContext()?.spanId ?? '00000';

        res.setHeader("server-timing", `traceparent;desc="00-${traceId}-${spanId}-01"`);

        // sleep randomly
        let delay = Math.floor(Math.random() * (1900 - 60 + 1));
        await nonBlockingDelay(delay);

        next();
    });
};
