import Products from "../modals/ProductsModal.js"
export const addProduct = async(req, res) => {
    try {
        console.log(req.body)
        const { Name, Price, Image } = req.body;
        if(!Name) return res.send("Name is required")
        if(!Price)return res.send("Price is required")
        const product = new Products({
            name : Name,
            price : Price,
            image: Image
        })
        console.log(product, "product here");
        await product.save();
        return res.send(product);
        // res.send(`Hi  from add`)
    } catch (error) {
        console.log(error)
    }
}


//Get all products

export const getAllProducts = async (req, res) =>
{
    try{
        const response = await Products.find({}).exec();
        if(response){
            return res.send(response);
        }else{
            return res.send("No products found")
        }
    }catch (error){
        return res.send(error)
    }
}



//get 5 products

export const getLimitedProducts = async (req, res) =>
{
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
        if(product[0]){
            res.send({
                product,
                totalPages: Math.ceil(count / limit),
                currentPage: page
              });
        }else{
            return res.send("No more products here!")
        }
      
    }catch (error){
        return res.send(error)
    }
}





