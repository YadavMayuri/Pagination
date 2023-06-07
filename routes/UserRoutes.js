import express from "express";
import { addProduct, getAllProducts, getLimitedProducts} from "../controllers/ProductControllers.js";


var router = express.Router();



router.post('/addProduct', addProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getLimitedProducts', getLimitedProducts);




export default router;
