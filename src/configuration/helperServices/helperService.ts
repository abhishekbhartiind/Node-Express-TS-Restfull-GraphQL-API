export const returnType = (
  response: any,
  statusType = 200,
  message = "",
  data?: any,
  throwError: boolean = false
) => {
  if (!throwError) {
    return response.status(statusType).json({ message, data });
  } else {
    const error: any = new Error();
    error.statusCode = statusType + " " + message;
    throw error;
  }
};

const strip_api_key = process.env.STRIP_API_KEY;
const strip = require("strip")(strip_api_key);
export const checkOut = (request: any, response: any) => {
  let products: any[] = [] as any;
  // io.getIO().emit('posts', {
  //   action: 'create',
  //   post: { ...products, creator: { _id: request.userId, name: '' } }
  // });
  return strip.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: products.map((p) => {
      return {
        name: p.productId.title,
        description: p.productId.description,
        amount: p.productId.price * 100,
        currency: "usd",
        quantity: p.quantity,
      };
    }),
    success_url:
      request.protocol + "://" + request.get("host") + "/checkout/success", // => http://localhost:3000
    cancel_url:
      request.protocol + "://" + request.get("host") + "/checkout/cancel",
  });
};
