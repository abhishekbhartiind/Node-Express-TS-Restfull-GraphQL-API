import Product from "../models/noSql/product";

const resolve = {
  createProduct: async function ({ ...productInput }, request: any) {
    const existingProduct = await Product.findOne({
      _title: productInput.title,
    });
    if (existingProduct) {
      const error = new Error("Product exists already!");
      throw error;
    }

    const product = new Product({
      title: productInput.title,
      price: productInput.price,
      description: productInput.description,
      imageUrl: productInput.imageUrl,
      userId: productInput.userId,
    });
    const createdProduct: any = await product.save();
    return { ...createdProduct._doc, _id: createdProduct._id.toString() };
  },
};

export default resolve;
