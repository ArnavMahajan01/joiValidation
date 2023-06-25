const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userSignupSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().optional,
  lastName: Joi.string().required(),
  userName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().required().min(0).max(100),
  DOB: Joi.date().greater(new Date("1940-01-01")).required(),
  address: {
    addressLine: Joi.string().max(50).required(),
    state: Joi.string().max(15).required(),
    country: Joi.string().max(20).required(),
    zipCode: Joi.string().max(7).required(),
  },
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
  confirmPassword: Joi.ref("password"),
});

app.post("/user", (req, res, next) => {
  const { error, value } = userSignupSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    console.log(error);
    return res.send("Invalid Request: " + JSON.stringify(error));
  } else {
    console.log(value);
    return res.send("Successfuly inside user: " + JSON.stringify(value));
  }
});

app.get("/userData", (req, res, next) => {
  return res.status(200).send("User Data Get Method Called");
});

app.listen(3000, () => {
  console.log("Server starting at 3000");
});
