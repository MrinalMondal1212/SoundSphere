const userModel = require("../models/userModel")
const statusCode = require("../utils/statusCode")
const bcrypt = require("bcryptjs")

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
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: "All fields are required "
                })
            }
            //existing user
            const existing = await userModel.findOne({ email })
            if (existing) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: "User already exist "
                })
            }
            //bcrypt js
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)
            const data = new userModel({
                name: name,
                email: email,
                password: hashedPassword
            })
            const user = await data.save()

            //register
            return res.status(statusCode.OK).json({
                success: true,
                message: "User registered Successfully",
                data: user
            })

        } catch (error) {
            console.log(error)
            return res.status(statusCode.SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error !!"
            })

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
            // login pls
            return res.status(statusCode.OK).json({
                success: true,
                message: "User Login Successful",
                data: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role
                },
            })

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