module.exports = {
  "content-api": {
    type: "content-api",
    routes: [
      {
        method: "GET",
        path: "/stripe-payment/",
        handler: "stripePayment.index",
        config: { policies: [] },
      },
      {
        method: "POST",
        path: "/stripe-payment/create",
        handler: "stripePayment.create",
        config: { policies: [] },
      },
      {
        method: "PUT",
        path: "/stripe-payment/:stripeProductId",
        handler: "stripePayment.update",
        config: { policies: [] },
      },
    ],
  },
};
