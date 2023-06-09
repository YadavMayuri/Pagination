import express from "express";
import { addProduct, getAllProducts, getLimitedProducts, getProductsByBrand, getProductsByCategory, getProductsByColor,  getProductsByColorAndSize,  getProductsByFabric,  getProductsByPrice, getProductsBysize} from "../controllers/ProductControllers.js";


var router = express.Router();



router.post('/addProduct', addProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getLimitedProducts', getLimitedProducts);
router.get('/getProductsByColor', getProductsByColor);
router.get('/getProductsBySize', getProductsBysize);
router.get('/getProductsByPrice', getProductsByPrice);
router.get('/getProductsByCategory', getProductsByCategory);
router.get('/getProductsByBrand', getProductsByBrand);
router.get('/getProductsByFabric', getProductsByFabric);
router.get('/getProductsByColorAndSize', getProductsByColorAndSize);











export default router;
