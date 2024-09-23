import fs from "fs";
import crypto from "crypto";

class UsersManager {
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
      const users = JSON.parse(data);
      return category ? users.filter(user => user.category === category) : users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async read(id) {
    try {
      const users = await this.readAll();
      return users.find(user => user.id === id) || null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const users = await this.readAll();
      users.push(data);
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
      return data.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const users = await this.readAll();
      const index = users.findIndex(user => user.id === id);
      if (index === -1) return null;
      users[index] = { ...users[index], ...newData };
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
      return users[index];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const users = await this.readAll();
      const updatedUsers = users.filter(user => user.id !== id);
      if (users.length === updatedUsers.length) return null;
      await fs.promises.writeFile(this.path, JSON.stringify(updatedUsers, null, 2));
      return `User with id ${id} deleted`;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const usersManager = new UsersManager("./src/data/files/users.json");
export default usersManager;