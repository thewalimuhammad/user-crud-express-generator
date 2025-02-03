import {
  signupUser,
  verifyToken,
  loginUser,
  findAllUser,
  findOneUser,
  updateOneUser,
  deleteOneUser,
} from "../services/user.service.js";
import {
  signupUserValidation,
  loginUserValidation,
  updateOneUserValidation,
} from "../validations/user.validation.js";

const signupUserController = async (req, res) => {
  try {
    await signupUserValidation.validateAsync(req.body);
    const user = await signupUser(req.body);
    return res.status(201).json({
      message: "User created",
      data: {
        token: user.token,
      },
    });
  } catch (error) {
    console.log("object");
    if (error.isJoi === true) {
      return res.status(400).json({ error: error.details[0].message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const verifyTokenController = async (req, res) => {
  try {
    const user = await verifyToken(req.user.id.id);
    return res.status(200).json({ message: "Token verified", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUserController = async (req, res) => {
  try {
    await loginUserValidation.validateAsync(req.body);
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        token: user.token,
      },
    });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({ error: error.details[0].message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const findAllUserController = async (req, res) => {
  try {
    const users = await findAllUser();
    return res.status(200).json({
      message: "All users",
      data: {
        count: users.length,
        users,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findOneUserController = async (req, res) => {
  try {
    const user = await findOneUser(req.params.id);
    if (user) {
      return res.status(200).json({ message: "User found", data: { user } });
    }
    return res.status(400).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateOneUserController = async (req, res) => {
  try {
    await updateOneUserValidation.validateAsync(req.body);
    const user = await updateOneUser(req.params.id, req.body);
    return res.status(200).json({ message: "User updated", data: { user } });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({ error: error.details[0].message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const deleteOneUserController = async (req, res) => {
  try {
    await deleteOneUser(req.params.id);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  signupUserController as signupUser,
  verifyTokenController as verifyToken,
  loginUserController as loginUser,
  findAllUserController as findAllUser,
  deleteOneUserController as deleteOneUser,
  findOneUserController as findOneUser,
  updateOneUserController as updateOneUser,
};
