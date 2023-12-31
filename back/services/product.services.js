const Products = require("../models/Products");
const Categories = require("../models/Categories");

class ProductService {
  static async addProduct(productData) {
    try {
      const { id_category, name, description, price, url_image, stock } =
        productData;
      const product = await Products.create({
        categoryId: id_category,
        name: name,
        description: description,
        price: price,
        url_image: url_image,
        stock: stock,
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getAllProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getProductById(productId) {
    try {
      const product = await Products.findByPk(productId);
      if (product) {
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getProductCategory(categoryId) {
    try {
      const products = await Products.findAll({
        where: {
          categoryId: parseInt(categoryId),
        },
        include: {
          model: Categories,
          as: "category",
        },
      });
      console.log(products);
      if (products) {
        return products;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async deleteProductById(productId) {
    try {
      const product = await Products.findByPk(productId);
      if (product) {
        await Products.destroy({ where: { id: productId } });
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async updateProductById(productId, productData) {
    try {
      const { id, categoryId, name, description, price, url_image, stock } =
        productData;
      const product = await Products.findByPk(productId);
      if (product) {
        await Products.update(
          {
            id: id,
            categoryId: categoryId,
            name: name,
            description: description,
            price: price,
            url_image: url_image,
            stock: stock,
          },
          { where: { id: productId } }
        );
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = ProductService;
