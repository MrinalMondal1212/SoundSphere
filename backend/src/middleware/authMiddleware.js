const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")
const statusCode = require("../utils/statusCode")

class AuthMiddleware {
    static async verifyToken(req, res, next) {
        try {
            const token = req.headers.authorization
            //checking validation
            if (!token || !token.startsWith("Bearer ")) {
                res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: "No token Provided "
                })
            }

            const cleanToken = token.split(" ")[1]
            const decoded = jwt.verify(
                cleanToken,
                process.env.JWT_SECRET_KEY
            );
            const user = await UserModel.findById(decoded.id);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }

            req.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            };

            next();
        } catch (error) {
            console.log(error)
            res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid or expired token"
            })

        }
    }
    //rolechek validation
    static roleCheck(requiredRole) {
        return (req, res, next) => {
            if (req.user.role !== requiredRole) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Admin only",
                });
            }

            next();
        };
    }
}

module.exports = AuthMiddleware