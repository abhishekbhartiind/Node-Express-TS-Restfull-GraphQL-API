import Product from "../../models/sql/product";
import { returnType } from "../../configuration/helperServices/helperService";
import { eApiErrorMessages } from "../../models/enum/auth_enum";

export const addProduct = (request: any, response: any) => {
  const { title, price, imageUrl, description } = request.body;
  Product.create({
    title,
    price,
    imageUrl,
    description,
  })
    .then((result: any) => {
      return returnType(response, 200, "Product save successfuly!", result);
    })
    .catch((error: any) => {
      return returnType(
        response,
        500,
        eApiErrorMessages.apiNoClueError_0,
        error
      );
    });
};
