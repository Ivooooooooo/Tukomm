import usersManager from "../data/users.manager.js";

const handleError = (message, statusCode = 404) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

async function getAllUsers(req, res, next) {
  try {
    const response = await usersManager.readAll();
    if (response.length > 0) {
      return res.status(200).json({ message: "Users retrieved successfully", response });
    }
    handleError("No users found", 404);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);
    if (response) {
      return res.status(200).json({ message: "User retrieved successfully", response });
    }
    handleError(`User with ID ${uid} not found`, 404);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const response = await usersManager.create(data);
    return res.status(201).json({ message: "User created successfully", response });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const response = await usersManager.update(uid, newData);
    if (!response) {
      handleError(`Unable to update: User with ID ${uid} not found`, 404);
    }
    return res.status(200).json({ message: "User updated successfully", response });
  } catch (error) {
    next(error);
  }
}

async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.delete(uid);
    if (!response) {
      handleError(`Unable to delete: User with ID ${uid} not found`, 404);
    }
    return res.status(200).json({ message: "User deleted successfully", response });
  } catch (error) {
    next(error);
  }
}

async function showUsers(req, res, next) {
  try {
    const users = await usersManager.readAll();
    if (users.length > 0) {
      return res.render("users", { users });
    }
    handleError("No users found", 404);
  } catch (error) {
    next(error);
  }
}

async function showOneUser(req, res, next) {
  try {
    const { uid } = req.params;
    const user = await usersManager.read(uid);
    if (user) {
      return res.render("oneuser", { one: user });
    }
    handleError(`User with ID ${uid} not found`, 404);
  } catch (error) {
    next(error);
  }
}

export {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  destroyUser,
  showUsers,
  showOneUser
};
