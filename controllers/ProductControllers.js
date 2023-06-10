import Products from "../modals/ProductsModal.js"
export const addProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { Name, Price, Image, Category, color, brand, size, fabric } = req.body;
        if (!Name) return res.send("Name is required")
        if (!Price) return res.send("Price is required")
        if (!Image) return res.send("Image is required")
        if (!Category) return res.send("Category is required")
        if (!color) return res.send("color is required")
        if (!brand) return res.send("brand is required")
        if (!size) return res.send("size is required")
        if (!fabric) return res.send("fabric is required")

        const product = new Products({
            name: Name,
            price: Price,
            image: Image,
            category: Category,
            color: color,
            brand: brand,
            size: size,
            fabric: fabric
        })
        console.log(product, "product here");
        await product.save();
        return res.send(product);
        // res.send(`Hi  from add`)
    } catch (error) {
        console.log(error)
    }
}


//get products by color and size

export const getProductsByColorAndSize = async (req, res) => {
    try {
        const { color, size } = req.body;
        if (!color) return res.send("Color is required")
        if (!size) return res.send("Size is required")

        const response = await Products.find({ color: color, size:size }).exec();
        if (response[0]) {
            return res.send(response);
        } else {
            return res.send("No products found")
        }
    } catch (error) {
        return res.send(error)
    }
}

//get products by price

export const getProductsByPrice = async (req, res) => {
   
    try {
        const { minPrice, maxPrice} = req.body;
        // if (!minPrice) return res.send("Min Price is required")
        // if (!maxPrice) return res.send("Max Price is required")

        const response = await Products.find( {price :{$gte: minPrice, $lte: maxPrice}}).exec();

        const TotalFilteredProducts = await Products.count( {price :{$gte: minPrice, $lte: maxPrice}}).exec();

        if (response[0]) {
            return res.send({response, TotalFilteredProducts});

        } else {
            return res.send("No products found")
        }
      
    } catch (error) {
        return res.send(error)
    }
}



//get products by color

export const getProductsByColor = async (req, res) => {
    try {
        const { color } = req.body;
        if (!color) return res.send("Color is required")
        const response = await Products.find({ color: color }).exec();
        if (response[0]) {
            return res.send(response);
        } else {
            return res.send("No products found")
        }
    } catch (error) {
        return res.send(error)
    }
}


//get products by size

export const getProductsBysize = async (req, res) => {
    try {
        const { size } = req.body;
        if (!size) return res.send("Size is required")
        const response = await Products.find({ size: size }).exec();
        if (response[0]) {
            return res.send(response);

        } else {
            return res.send("No products found")
        }
    } catch (error) {
        return res.send(error)
    }
}



//get products by category

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) return res.send("Category is required")
        const response = await Products.find({ category: category }).exec();
        if (response[0]) {
            return res.send(response);

        } else {
            return res.send("No products found")
        }
    } catch (error) {
        return res.send(error)
    }
}



//get products by Brand

export const getProductsByBrand = async (req, res) => {
    try {
        const { brand } = req.body;
        if (!brand) return res.send("brand is required")
        const response = await Products.find({ brand: brand }).exec();
        if (response[0]) {
            return res.send(response);

        } else {
            return res.send("No products found")
        }
    } catch (error) {
        return res.send(error)
    }
}



//get products by Fabric

export const getProductsByFabric = async (req, res) => {
    try {
        const { fabric } = req.body;
        if (!fabric) return res.send("fabric is required")
        const response = await Products.find({ fabric: fabric }).exec();
        if (response[0]) {
            return res.send(response);

        } else {
            return res.send("No products found")
        }
    } catch (error) {
        return res.send(error)
    }
}




//Get all products

export const getAllProducts = async (req, res) => {
    try {
        const response = await Products.find({}).exec();
        if (response) {
            return res.send(response);
        } else {
            return res.send("No products found")
        }
    } catch (error) {
        return res.send(error)
    }
}



//get limited (5) products (Pagination)

export const getLimitedProducts = async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 5 } = req.body;

    try {
        // execute query with page and limit values
        const product = await Products.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)  // 1-1*5=0 record skip, 2-1*5=5 records skip, 3-1*5=10 records skip
            .exec();

        // get total documents in the product collection 
        const count = await Products.count();

        // return response with product, total pages, and current page
        if (product[0]) {
            res.send({
                product,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } else {
            return res.send("No more products here!")
        }

    } catch (error) {
        return res.send(error)
    }
}





