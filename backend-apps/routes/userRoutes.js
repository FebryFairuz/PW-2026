const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

// PUBLIC ROUTES (Tidak perlu autentikasi)
    router.post("/login", userController.loginUser);
    router.post("/register", userController.createUser);
// END PUBLIC ROUTES

// PROTECTED ROUTES (Perlu autentikasi)
    router.use(verifyToken);
    router.get("/stats/summary", userController.getStatistics); // Statistics route (harus di atas :id route)
    // CRUD routes
    router.get("/", userController.getAllUsers);
    router.get("/:id", userController.getUserById);
    router.post("/", userController.createUser);
    router.put("/:id", userController.updateUser);
    router.patch("/:id", userController.patchUser);
    router.delete("/:id", userController.deleteUser);
    // Additional routes
    router.patch("/:id/toggle-status", userController.toggleUserStatus);
    router.post("/:id/change-password", userController.changePassword);
// END PROTECTED ROUTES

module.exports = router;