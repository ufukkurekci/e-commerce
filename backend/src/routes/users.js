import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../db/users";
import ApiError from "../error/ApiError";

export default (router) => {
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    const passwordConfirmed = await bcryptjs.compare(password, user.password);

    // if (!user.cardUserKey) {
    //   throw new ApiError("Kullanıcıya kart eklenmemiş.", 401, "unAuthorized");
    // }
    if (!user || passwordConfirmed == false) {
      throw new ApiError("Incorrect password or email", 401, "unAuthorized");
    }

    const UserJson = user.toJSON();
    const token = jwt.sign(UserJson, process.env.JWT_SECRET);
    res.json({
      token: `Bearer ${token}`,
      user: UserJson,
    });
  });

  router.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) {
        throw new ApiError("Email is already taken", 401, "unAuthorized");
      }
      const newUser = await new Users({
        email: email,
        password: password,
        locale: "tr",
        name: "ufuk",
        surname: "kurekci",
        phoneNumber: "+905350000000",
        identityNumber: "00000000000",
        avatarUrl: "http",
        address: "ornek adres",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34732",
        ip: req.connection.remoteAddress,
        cardUserKey: "",
      });
      res.status(201).json({
        message: "User created",
        newUser,
      });
        await newUser.save();
    } catch (error) {
      console.log(error);
      throw new ApiError(error, 401, "unAuthorized");
    }
  });
};
