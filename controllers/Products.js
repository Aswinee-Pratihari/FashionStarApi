import Product from "../models/ProductModel.js";
import Router from "express";
const router = Router();
//create product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(402).json(error.message);
  }
});

//delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).send("product deleted");
  } catch (error) {
    res.status(402).json(error.message);
  }
});
//get product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//get all product
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//update its details

export default router;
