import fs from "fs";
import Product from "../../models/sql/product";
import { returnType } from "../../configuration/helperServices/helperService";
import { eApiErrorMessages } from "../../models/enum/auth_enum";

const pdfKit = require("pdfkit");

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

export const addImage = (request: any, response: any) => {
  const image = request.file;
  if (!image) {
    return returnType(response, 500, "Please upload correct file");
  }
  return returnType(response, 200, "Image save on server", image);
};

export const downloadImage = (request: any, response: any) => {
  const imageId = request.params.id;
  try {
    const file = fs.createReadStream(`assets/images/${imageId}`);
    response.setHeader("Content-Type", "application/image");
    response.setHeader("Content-Disposition", "inline");
    file.pipe(response);
  } catch (err: any) {
    return returnType(response, 500, eApiErrorMessages.apiNoClueError_0, err);
  }
};

export const deleteImage = (request: any, response: any) => {
  const imageId = request.params.id;
  try {
    fs.unlink(`assets/images/${imageId}`, (error: any) => {
      if (error) {
        return returnType(
          response,
          500,
          eApiErrorMessages.apiNoClueError_0,
          error
        );
      } else {
        return returnType(response, 200, "File deleted successfuly !");
      }
    });
  } catch (err: any) {
    return returnType(response, 500, eApiErrorMessages.apiNoClueError_0, err);
  }
};

export const generatePdf = (request: any, response: any) => {
  try {
    const pdfId = request.params.name;
    const pdfDoc = new pdfKit();
    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", "inline");
    //pdfDoc.pipe(fs.createWriteStream(`assets/pdf/${pdfId}`)); // only require to open file
    pdfDoc.pipe(response);
    pdfDoc.fontSize(26).text("Invoice", {
      underline: true,
    });
    pdfDoc.text("-----------------------");
    pdfDoc.fontSize(14).text("PDF create sample");
    pdfDoc.text("-----------------------");
    pdfDoc.end();
    // return returnType(response, 200, "PDF Generate Successfully!");
  } catch (err: any) {
    return returnType(response, 500, eApiErrorMessages.apiNoClueError_0, err);
  }
};
