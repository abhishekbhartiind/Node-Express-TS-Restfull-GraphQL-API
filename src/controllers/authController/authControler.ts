import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import User from "../../models/noSql/user";
import io from "../../configuration/helperServices/socketServices";

dotenv.config();

const strip_api_key = process.env.STRIP_API_KEY;
const strip = require("strip")(strip_api_key);

export const signIn = (request: any, response: any) => {
  const email = request.body.email;
  const password = request.body.password;
  //request.SetHeader("Set-Cookies", "test=true; HttpOnly");
  User.findOne({ email: email })
    .then((user: any) => {
      if (!user) {
        return response.redirect("/login");
      }
      bcrypt
        .compare(password, user?.password)
        .then((doMatch) => {
          if (doMatch) {
            request.session.isLoggedIn = true;
            request.session.user = user;
            return request.session.save((err: any) => {
              console.log(err);
              //response.redirect('/');
            });
          }
          //response.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

export const signUp = (request: any, response: any) => {};

export const signOut = (request: any, response: any) => {
  response.clearCookie("token");
  response.status(200).json({
    message: "User signout success!",
  });
};

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
