import Product from "../../models/sql/product";
import { returnType } from "../../configuration/helperServices/helperService";
import { eApiErrorMessages } from "../../models/enum/auth_enum";

export const addProduct = (request: any, response: any) => {
  const {
    title,
    price,
    imageUrl,
    description,
    isAvailable,
    rating,
    qty,
    userId,
  } = request.body;
  Product.create({
    title,
    price,
    imageUrl,
    description,
    isAvailable,
    rating,
    qty,
    userId,
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

export const fetchProduct = (request: any, response: any) => {
  const curPage = +request?.query?.page || 1;
  const pageSize = +request?.query?.pageSize || 5;
  Product.findAndCountAll({
    limit: pageSize,
    offset: curPage,
  })
    .then((result: any) => {
      return returnType(response, 200, "Product fetch successfuly!", result);
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

export const fetchProductById = (request: any, response: any) => {
  const id = request.params.id;
  Product.findByPk(id)
    .then((result: any) => {
      return returnType(response, 200, "Product fetch successfuly!", result);
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

export const updateProductById = (request: any, response: any) => {
  const id = request.params.id;
  const {
    title,
    price,
    imageUrl,
    description,
    isAvailable,
    rating,
    qty,
    userId,
  } = request.body;

  Product.findByPk(id)
    .then((product: any) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      product.isAvailable = isAvailable;
      product.rating = rating;
      product.qty = qty;
      product.userId = userId;
      return product.save();
    })
    .then((result: any) => {
      return returnType(response, 200, "Product update successfuly!", result);
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

export const deleteProductById = (request: any, response: any) => {
  const id = request.params.id;
  Product.findByPk(id)
    .then((product: any) => {
      return product.destroy();
    })
    .then((result: any) => {
      return returnType(response, 200, "Product delete successfuly!", result);
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
