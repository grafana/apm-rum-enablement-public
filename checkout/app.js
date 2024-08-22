const os = require('os');
const express = require('express');
const app = express();
const redis = require('redis');
const winston = require('winston');
const { OpenTelemetryTransportV3 } = require('@opentelemetry/winston-transport');

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

// Create a logger and use in your app
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new OpenTelemetryTransportV3(),
    ]
});

app.use(express.json());

// Function to simulate payment processing with a delay
function processPayment(paymentInfo) {
    return new Promise((resolve, reject) => {
        // Simulate a delay (e.g., 2 seconds) to mimic payment processing time
        const delay = 2000; // 2000 milliseconds = 2 seconds

        setTimeout(() => {
            // Simulate an occasional failure with a 5% chance
            const paymentFailure = Math.random() < 0.05;

            if (paymentFailure) {
                return reject(new Error('Payment processing failed. Please check your payment details and try again.'));
            }

            // Simulate successful payment processing
            logger.info('Payment processed successfully:', paymentInfo);

            resolve({ status: 'success', transactionId: 'TX123456789' });
        }, delay);
    });
}

// Function to handle checkout logic
async function processCheckout(products, paymentInfo) {
    // Simulate an occasional failure with a 10% chance
    const isFailure = Math.random() < 0.1;

    if (isFailure) {
        logger.error('Internal Server Error. Please try again later.');

        throw new Error('Internal Server Error. Please try again later.');
    }

    // Basic validation
    if (!products || products.length === 0) {
        logger.error('Cart is empty.');

        throw new Error('Cart is empty.');
    }

    if (!paymentInfo || !paymentInfo.cardNumber) {
        logger.error('Invalid payment information.');

        throw new Error('Invalid payment information.');
    }

    // Process payment
    const paymentResult = await processPayment(paymentInfo);

    // Simulate successful checkout processing
    logger.info('Checkout successful:', { products, paymentInfo, paymentResult });

    return { message: 'Checkout completed successfully!', transactionId: paymentResult.transactionId };
}

app.post('/api/checkout', async function(req, res, next) {
    const { products, paymentInfo } = req.body;

    try {
        const result = await processCheckout(products, paymentInfo);
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
});

app.get('/', function(req, res) {
    redisClient.get('numVisits', function(err, numVisits) {
        numVisitsToDisplay = parseInt(numVisits) + 1;
        if (isNaN(numVisitsToDisplay)) {
            numVisitsToDisplay = 1;
        }
       res.send(os.hostname() +': Number of visits is: ' + numVisitsToDisplay);
        numVisits++;
        redisClient.set('numVisits', numVisits);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    
    res.status(500).send('Something broke!')
})

app.listen(8003, function() {
    console.log('Web application is listening on port 5000');
});
