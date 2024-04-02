const express = require('express');
const router = express.Router();
const apiController = require('../controller/controller');

router.get("/get", apiController.get);
router.post("/post", apiController.post);
router.post("/edit", apiController.edit);
router.delete("/delete", apiController.delete);
router.get("/redirect/:title", apiController.redirect);
router.post("/addClick/:title", apiController.addClick);


module.exports = router;