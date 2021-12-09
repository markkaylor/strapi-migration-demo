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

    const model = strapi.config.get("plugin.simple-stripe").model;

    if (!model) {
      return ctx.throw(400, "Bad config");
    }

    const product = await strapi.services[`api::${model}.${model}`].findOne(
      data.product.id
    );

    const stripeService = strapi.plugins["simple-stripe"].services.stripe;

    const paymentIntent = await stripeService.getPaymentIntent(
      product.price * 100
    );

    const payment = {
      stripeProductId: paymentIntent.id,
      stripePaymentStatus: paymentIntent.status,
    };

    await strapi.entityService.create("plugin::simple-stripe.stripe-payment", {
      data: payment,
    });

    ctx.send({
      clientSecret: paymentIntent.client_secret,
    });
  },

  update: async (ctx) => {
    const { stripeProductId } = ctx.params;
    const data = ctx.request.body;

    const entity = await strapi
      .query("plugin::simple-stripe.stripe-payment")
      .findOne({ where: { stripeProductId } });

    await strapi.entityService.update(
      "plugin::simple-stripe.stripe-payment",
      entity.id,
      { data: { stripePaymentStatus: data.stripePaymentStatus } }
    );

    ctx.send({
      message: "Ok!",
      status: data.stripePaymentStatus,
    });
  },
};
