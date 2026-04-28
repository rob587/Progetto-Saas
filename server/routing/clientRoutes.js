const express = require("express");
const router = express.Router();
const clientController = require("../controller/clientController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", verifyToken, clientController.getClients);
router.get("/:id", verifyToken, clientController.getClientById);
router.post("/", verifyToken, clientController.createClient);
router.put("/:id", verifyToken, clientController.updateClient);
router.delete("/:id", verifyToken, clientController.deleteClient);

module.exports = router;
