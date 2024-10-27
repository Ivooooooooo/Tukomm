import usersMongoManager from "../data/mongo/managers/user.manager.js";

const create = async (req, res, next) => {
    try {
        const data = req.body;
        const { _id } = await usersMongoManager.create(data);
        res.status(201).json({ message: "User successfully created", id: _id });
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const filter = req.query;
        const users = await usersMongoManager.readAll(filter);
        if (users.length === 0) throw { statusCode: 404, message: "No users found matching the provided filter" };
        res.status(200).json({ message: "Users successfully retrieved", users });
    } catch (error) {
        next(error);
    }
};

const read = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const user = await usersMongoManager.read(pid);
        if (!user) throw { statusCode: 404, message: `User with ID ${pid} not found` };
        res.status(200).json({ message: "User successfully retrieved", user });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const data = req.body;
        const updatedUser = await usersMongoManager.update(pid, data);
        if (!updatedUser) throw { statusCode: 404, message: `User with ID ${pid} not found` };
        res.status(200).json({ message: "User successfully updated", updatedUser });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const deletedUser = await usersMongoManager.destroy(pid);
        if (!deletedUser) throw { statusCode: 404, message: `User with ID ${pid} not found` };
        res.status(200).json({ message: "User successfully deleted", deletedUser });
    } catch (error) {
        next(error);
    }
};

async function authenticateUser(req, res, next) {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const allUsers = await usersMongoManager.readAll();
        const user = allUsers.find(user => user.email === email);

        if (user && user.password === password) {

            await usersMongoManager.update(user.id, { isOnline: true });
            console.log("Usuario logueado: ", user);

            return res.redirect("/");
        } else {
            return res.render("login", { error: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

async function registerUser(req, res, next) {
    try {
        const { 
            email, 
            password, 
            photo, 
            role,
            isOnline
        } = req.body;
        
        const data = {
            email,
            password,
            photo,
            role,
            isOnline
        };

        console.log(data);
    
        await usersMongoManager.create(data);
    
        return res.redirect("/users/login")
        
    } catch (error) {
        return next(error);
    }
}

async function profileView(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await usersMongoManager.read(userId); 

        res.render("profile", { user });
        
    } catch (error) {
        return next(error);
    }
}

export { create, readAll, read, update, destroy, authenticateUser, registerUser, profileView };
