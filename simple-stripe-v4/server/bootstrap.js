module.exports = async (
  {
    strapi
  }
) => {
  strapi.log.info("Stripe plugin enabled");

  strapi.plugins["simple-stripe"].services.stripe.init();
};
