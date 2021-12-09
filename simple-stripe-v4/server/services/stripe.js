const createStripeService = () => {
  let stripeInstance;

  return {
    init() {
      const config = strapi.config.get("plugin.simple-stripe");   

      if (!config) {
        throw Error("Config for stripe plugin not found");
      }

      const stripe = require("stripe")(config.secretKey);

      if (!config.secretKey) {
        throw Error("secretKey not set in stripe plugin config")
      } else {
        strapi.log.info("Initialized Stripe");
        stripeInstance = stripe;
      }

      return stripe;
    },
    async getPaymentIntent(amount) {
      const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: amount,
        currency: "usd",
      });

      return paymentIntent;
    },
  };
};

module.exports = createStripeService();
