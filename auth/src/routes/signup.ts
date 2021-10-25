import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

async function saveUser(email: string, password: string) {
  const user = User.build({ email, password });
  await user.save();
  return user;
}

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await saveUser(email, password);
    req.session = {
      jwt: jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      ),
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
