import db from "../models/index.js";

// Ensure db.user is defined
if (!db.user) {
  throw new Error(
    "db.user is not defined. Ensure the models are initialized correctly."
  );
}
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/auth.middleware.js";
export const signupUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  // console.log(userData);
  const newUser = await db.user.create(hashedPassword, ...userData);
  // console.log(newUser);
  return newUser;
};

export const verifyToken = async (id) => {
  const user = await db.user.findByPk(id);
  return user;
};

export const loginUser = async (email, password) => {
  const user = await db.user.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user);
    return { user, token };
  }
  throw new Error("Invalid credentials");
};

export const findAllUser = async () => {
  const users = await db.user.findAll();
  return users;
};

export const findOneUser = async (id) => {
  const user = await db.user.findByPk(id);
  return user;
};

export const updateOneUser = async (id, updateData) => {
  const user = await db.user.findByPk(id);
  if (user) {
    await user.update(updateData);
    return user;
  }
  throw new Error("User not found");
};

export const deleteOneUser = async (id) => {
  const user = await db.user.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  throw new Error("User not found");
};
