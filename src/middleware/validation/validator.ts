import { body, validationResult } from "express-validator";
import { Request, Response , NextFunction } from "express";
export const userValidationRules = () => {
  return [
    // username must be an email
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
  ];

};



export const tweetValidationRules = () => {
  return [

    body("content").isLength({ max: 280 }),

  ];
};
export const validate = (req : Request, res : Response, next : NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }


  return res.status(422).json({
    errors: errors,
  });
};
