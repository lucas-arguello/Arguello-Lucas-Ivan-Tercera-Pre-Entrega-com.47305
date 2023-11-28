import { ProductsService} from '../service/products.service.js'


export class ProductsController {

    static createProduct = async (req, res) => {
        try{
            const productInfo = req.body; //captamos la info del nuevo producto.
                        
            //Validamos si NO se esta recibiendo INFO del producto en la variable "productInfo", y mostramos el error.
            if (!productInfo) {
                throw new Error("La solicitud está vacía");
            }
            //con la info. recibida de la peticion POST, creamos el producto con el metodo "createProduct".
            const newProduct = await ProductsService.createProduct(productInfo);
            //respuesta para que el cliente, del nuevo producto creado.
            res.json({message:"El producto fue creado correctamente", data:newProduct});
    
            console.log("Un producto fue creado: ", newProduct);
    
        }catch(error){
            //respuesta para que el cliente sepa que la peticion no fue resuelta correctamente
            res.json({status:"error",message: error.message}) 
        };
    }

    static getProducts = async (req, res) => {
        try {
            const products = await ProductsService.getProducts()
            const limit = req.query.limit;//creamos el query param "limit". ej: localhost:8080/api/products?limit=2
                
        if(limit){
            const limitNum = parseInt(limit);//convertimos a "limit" de string a numero

            //utilizamos el metodo "slice" para obtener una parte del arreglo segun el numero limite que elija el cliente.
            const productsLimit = products.slice(0,limitNum);
            res.json(productsLimit);
            
           }else{
               //respondemos la peticion enviando el contenido guardado en prodcuts
               res.json(products)
               console.log("Listado de productos: ", products) 
           }
                
    }catch(error){
        console.log("getProducts",error.message);
        //respuesta para que el cliente sepa que la peticion no fue resuelta correctamente
        res.status(500).json({ status: "error", message: error.message }); 
    };
    }

    static getProductsId = async (req, res) => {
        try{
            //parseamos el valor recibido (como string) de la peticion, a valor numerico, para poder compararlo.
            const productId = req.params.pid;
            //con el "productService", llamamos el metodo "getProductById" y le pasamos el Id que habiamos parseado. 
            const product = await ProductsService.getProductById(productId);
    
            res.json({message:"El producto seleccionado es: ", data:product});
            
        }catch(error){
            //respuesta para que el cliente sepa que la peticion no fue resuelta correctamente
            res.json({status:"error",message: error.message}) 
        };
    }

    static updateProduct = async (req, res) => {
        try {
            const productId = req.params.pid;
            const updatedFields = req.body;
            const product= await ProductsService.updateProduct(productId, updatedFields);
            res.json({ message: "Producto actualizado correctamente", data: product});
            console.log("El producto modificado es: ", product);
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    }
    
    static deleteProduct = async (req, res) => {
        try {
            const productId = req.params.pid;
            const product = await ProductsService.deleteProduct(productId);
            if (product === null) {
                res.json({ status: "error", message: "No se encontró el producto a eliminar" });
                return;
            } else {
                res.json({ message: "Producto eliminado correctamente", data: product });
                console.log("El producto eliminado es: ", product);
                return;
            }
        } catch (error) {
            res.json({ status: "error", message: error.message });
            return;
        }
    }
}