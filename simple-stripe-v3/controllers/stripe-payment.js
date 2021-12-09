"use strict";
const _ = require("lodash");
/**
 * stripe-payment.js controller
 *
 * @description: A set of functions called "actions" of the `stripe-payment` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: (ctx) => {
    // Send 200 `ok`
    ctx.send({
      message: "ok",
    });
  },

  create: async (ctx) => {
    const data = ctx.request.body;

    const model = strapi.plugins["simple-stripe"].config.model;

    if (!model) {
      return ctx.throw(400, "Bad config");
    }

    const product = await strapi.services[model].findOne(data.product.id);

    const stripeService = strapi.plugins["simple-stripe"].services.stripe;

    const paymentIntent = await stripeService.getPaymentIntent(
      product.price * 100
    );

    const payment = {
      stripeProductId: paymentIntent.id,
      stripePaymentStatus: paymentIntent.status,
    };

    await strapi.query("plugins::simple-stripe.stripe-payment").create(payment);

    ctx.send({
      clientSecret: paymentIntent.client_secret,
    });
  },

  update: async (ctx) => {
    const { stripeProductId } = ctx.params;
    const data = ctx.request.body;

    await strapi
      .query("plugins::simple-stripe.stripe-payment")
      .update(
        { stripeProductId },
        { stripePaymentStatus: data.stripePaymentStatus }
      );

    ctx.send({
      message: "Ok!",
      status: data.stripePaymentStatus,
    });
  },
};
