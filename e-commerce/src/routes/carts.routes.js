
import {Router} from "express";//importamos "routes" desde la libreria de express, para poder realizar el ruteo de los metodos.
import { CartsController } from '../controller/carts.controller.js';
import { authorization, jwtAuth} from '../middlewares/auth.js';


const router = Router();

//Usamos el metodo GET para crear una ruta que nos permita obtener el listado de todos los carritos.
//http://localhost:8080/api/carts
router.get("/", CartsController.getCarts);

//Usamos el metodo GET para crear una ruta que nos permita obtener un solo carrito.
// http://localhost:8080/api/carts/cid
router.get("/:cid", CartsController.getCartsId);

//Usamos el metodo POST para crear una ruta que nos permita crear un carrito.
//http://localhost:8080/api/carts
router.post("/", CartsController.createCart);

//Usamos el metodo PUT para actualizar, obtenemos el carrito por su ID, y podemos completo.-- agregar prod o cambiar cant o cambiar el di porque que quiero poner otro prod
//http://localhost:8080/api/carts/:cid/product/:pid
router.put("/:cid", CartsController.updateCartId);

//Usamos el metodo PUT para crear una ruta que nos permita buscar un carrito y agregar productos en el carrito.-- solo agrega prod
//http://localhost:8080/api/carts/:cid/product/:pid
router.put("/:cid/product/:pid", jwtAuth, authorization(['Usuario']), CartsController.addProduct); 
      
//Usamos el metodo PUT para que actualice el produto del carrito por su ID.-- solo actualizamos la cantidad.
//http://localhost:8080/api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", jwtAuth, authorization(['Usuario']), CartsController.updateProductInCart);

//Usamos el metodo DELETE para eliminar un carrito por su ID.
//http://localhost:8080/api/carts/:cid
router.delete("/:cid", CartsController.deleteCartId); 


//Usamos el metodo DELETE para eliminar un producto específico de un carrito por su ID de carrito y producto
//http://localhost:8080/api/carts/:cid/products/:pid
router.delete("/:cid/products/:pid", CartsController.deleteProductInCart);

//------------------- Ruta para crear un tiket
router.post('/:cid/purchase',jwtAuth, authorization(['Usuario']), CartsController.purchaseCart)


export {router as cartsRouter};




//RUTAS

//get- para obtener todos los carritos --> //http://localhost:8080/api/carts

//get- para obtener un carrito por su ID --> //http://localhost:8080/api/carts/cid

//post- para crear carritos --> //http://localhost:8080/api/carts

//put- para un carrito por su id --> //http://localhost:8080/api/carts/:cid

//put- para agregar productos y actualizar carrito--> http://localhost:8080/api/carts/:cid/products/:pid

//delete- para borrar carritos --> //http://localhost:8080/api/carts/:cid

//delete- para borrar productos especifico  --> // http://localhost:8080/api/carts/:cid/products/:pid 