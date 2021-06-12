const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const Order = require("../models/order");
const Product = require("../models/product");

const ordersController = require("../controllers/orders");

router.get("/", checkAuth, ordersController.orders_get_all);

router.post("/", checkAuth, ordersController.orders_create_order);

router.get("/:orderId", checkAuth, ordersController.orders_get_order_by_id);

router.delete("/:orderId", checkAuth, ordersController.orders_delete_order);

module.exports = router;
