import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

async function validateAlreadyExistingUser(email: string) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email in use");
  }
}

async function saveUser(email: string, password: string) {
  const user = User.build({ email, password });
  await user.save();
  return user;
}

function validateRequest(req: Request) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
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
  async (req: Request, res: Response) => {
    validateRequest(req);
    const { email, password } = req.body;
    await validateAlreadyExistingUser(email);
    const user = await saveUser(email, password);
    res.status(201).send(user);
  }
);

export { router as signupRouter };
