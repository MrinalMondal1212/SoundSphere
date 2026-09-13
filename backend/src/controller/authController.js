const userModel = require("../models/userModel")
const statusCode = require("../utils/statusCode")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AuthMiddleware = require("../middleware/authMiddleware")

//admin@gmail.com // super admin
// const token = req.headers.authorization;

//             const countUser = await User.countDocuments();
//             // console.log("CC :",countUser);

//             if (countUser === 0) {
//                 return next();
//             }


//             if (!token || !token.startsWith("Bearer ")) {
//                 return res.status(401).json({
//                     success: false,
//                     message: "No token provided",
//                 });
//             }

class AuthController {
   static async register(req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Only user and artist can register themselves
        if (role && !["user", "artist"].includes(role)) {
            return res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: "Role must be either user or artist"
            });
        }

        // Existing user
        const existing = await userModel.findOne({ email });

        if (existing) {
            return res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const data = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: role || "user"
        });

        const user = await data.save();

        return res.status(statusCode.OK).json({
            success: true,
            message: "Registration successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(statusCode.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error !!"
        });
    }
}
    // login 
    static async login(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: "All fields are required "
                })
            }
            //checking existing user
            const existingUser = await userModel.findOne({ email })
            if (!existingUser) {
                return res.status(statusCode.BAD_REQUEST).json({
                    sucess: false,
                    message: "User already exists"
                })
            }
            // invalid credentials 
            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (!isMatch) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid Credentials"
                })
            }
            
            // jwt verification and token jeneration will be here !!
            // making the token like access token (time is set so aoutmatically you will logout)
            const token = await jwt.sign({
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
                role: existingUser.role
            }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
            
            // login pls
            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    phone: existingUser.phone,
                    role: existingUser.role
                },
                token: token
            });

        } catch (error) {
            console.log(error)
            return res.status(statusCode.SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error !!"
            })
        }
    }

}

module.exports = AuthController