module.exports = async () => {
  strapi.log.info("Stripe plugin enabled");

  strapi.plugins["simple-stripe"].services.stripe.init();
};
