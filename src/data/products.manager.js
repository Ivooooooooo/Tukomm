import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor(path) {
    this.path = path;
    this.initializeFile();
  }

  initializeFile() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("File created");
    }
  }

  async readAll(category) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return category ? products.filter(product => product.category === category) : products;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async read(id) {
    try {
      const products = await this.readAll();
      return products.find(product => product.id === id) || null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const products = await this.readAll();
      products.push(data);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return data.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const products = await this.readAll();
      const index = products.findIndex(product => product.id === id);
      if (index === -1) return null;
      products[index] = { ...products[index], ...newData };
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return products[index];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const products = await this.readAll();
      const updatedProducts = products.filter(product => product.id !== id);
      if (products.length === updatedProducts.length) return null;
      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
      return `Product with id ${id} deleted`;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const productsManager = new ProductsManager("./src/data/files/products.json");
export default productsManager;