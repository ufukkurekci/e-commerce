import "express-async-errors";
import dotenv from "dotenv";
import config from "./config";
import express from "express";
import logger from "morgan";
import http from "http";
import cors from "cors";
import Users from "./db/users";
import helmet from "helmet";
import GenericErrorHandler from "./middlewares/GenericErrorHandler";
import ApiError from "./error/ApiError";
import mongoose from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import routes from "./routes/index";
const path=require("path");
const envPath = config?.production
    ? "./env/.prod"
    : "./env/.dev"

dotenv.config({
    path: envPath
})

// BEGIN MONGO 
mongoose.connect(process.env.MONGO_URI,
).then(() => {
    console.log("connected mongodb");
}).catch((err) => {
    console.log(err);
})
// END MONGO CONNECT

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*"
}));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
console.log("Express uygulamasının çalışma dizini:", __dirname);
const router = express.Router();


app.use(logger(process.env.LOGGER))

app.use(helmet());




app.use(express.json({
    limit: "1mb"
}));

app.use(express.urlencoded({
    extended: true
}));

passport.serializeUser((user,done) =>{
    done(null,user);
});

passport.deserializeUser((id,done) =>{
    done(null,id);
});

app.use(passport.initialize());

const jwtOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(
    new JwtStrategy(
        jwtOpt,
        async (jwtPayload, done) => {
            try {
                const user = await Users.findOne({_id: jwtPayload._id});
                if (user) {
                    done(null,user.toJSON())
                }
                else {
                    done(new ApiError("Authorization is failed",401,"authorizationInvalid"),false);
                }
            } catch (error) {
                return done(error,false)
            }
        }
    )
)



routes.forEach((routeFn,index) => {
    routeFn(router)
})

app.use("/api",router);

app.use(GenericErrorHandler);

if(process.env.HTTPS_ENABLED === "true")
{
    // const key = fs.readFileSync(path.join(__dirname,"./certs/key.pem")).toString();
    // const cert = fs.readFileSync(path.join(__dirname,"./certs/cert.pem")).toString();

    const server = http.createServer(app);

    server.listen(process.env.PORT, () => console.log("Express app start listen " + process.env.PORT));
}
else{
    app.listen(process.env.PORT, () => console.log("Express app start listen " + process.env.PORT))

}


