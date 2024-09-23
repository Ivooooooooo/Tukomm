const isValidUser = (req, res, next) => {
  const { username, password, mail, photo, role } = req.body;
  const errors = [];

  if (!username) {
    errors.push("Username is required");
  } else if (username.length < 3) {
    errors.push("Username must be at least 3 characters long");
  } else if (/\s/.test(username)) {
    errors.push("Username cannot contain spaces");
  }

  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!mail) {
    errors.push("Email is required");
  } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(mail)) {
    errors.push("Email is not valid");
  }

  if (errors.length > 0) {
    const error = new Error(errors.join(", "));
    error.statusCode = 400;
    return next(error);
  }

  req.body.photo = photo || "defaultUrl.png";
  req.body.role = role || "0";

  next();
};

export default isValidUser;
