const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token is required"
            });
        }
        
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        success: false,
                        message: "Token has expired"
                    });
                }
                return res.status(403).json({
                    success: false,
                    message: "Invalid token"
                });
            }
            
            // Save user info to request
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(500).json({
            success: false,
            message: "Failed to authenticate token",
            error: error.message
        });
    }
};

exports.checkUserActive = async (req, res, next) => {
    try {
        const db = require("../models");
        const User = db.User;
        
        const user = await User.findByPk(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                message: "Account is inactive"
            });
        }
        
        next();
    } catch (error) {
        console.error("Error checking user status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to verify user status",
            error: error.message
        });
    }
};

exports.authenticateToken = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token required"
            });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid or expired token"
                });
            }

            // Attach user info to request
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication error",
            error: error.message
        });
    }
};