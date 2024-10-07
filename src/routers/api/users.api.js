import { Router } from "express";
import { 
    createUser,
    destroyUser,
    getAllUsers,
    getUser,
    updateUser
} from "../../controllers/users.controller.js";
import { 
    validateNewUser,
    validateUserModification
} from "../../middlewares/isValidData.mid.js";


const usersRouter = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:pid", getUser);
usersRouter.post("/", validateNewUser, createUser);
usersRouter.put("/:pid", validateUserModification, updateUser);
usersRouter.delete("/:pid", destroyUser);

export default usersRouter;