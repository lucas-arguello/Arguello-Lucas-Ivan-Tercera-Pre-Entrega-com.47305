import {Router} from "express";//importamos "routes" desde la libreria de express
import { authorization, jwtAuth } from '../middlewares/auth.js';
import { ViewsController } from '../controller/views.controller.js';

const router = Router();


//ruta para la vista home de todos los productos
router.get('/', jwtAuth, ViewsController.renderViewsHome);

//ruta para login
router.get('/login', ViewsController.renderViewsLogin);

//ruta para register local
router.get('/register', ViewsController.renderViewsRegister);

//ruta para el perfil de usuario
router.get('/profile', jwtAuth, ViewsController.renderViewsProfile);


//ruta para ver los productos en tiempo real y eliminar productos. 
router.get("/realtimeproducts", jwtAuth, authorization(['admin']), ViewsController.renderViewsRealTime);

//ruta que esta vinculada al servidor de "websocket"
router.get("/chats", jwtAuth, authorization(['Usuario']), ViewsController.renderViewsMessage);

//pagiante// localhost:8080?page=1 ... 2 ...3 ..etc
router.get('/products', jwtAuth, ViewsController.renderViewsProducts);

//ruta hardcodeada localhost:8080/cart/652832e702a5657f7db4c22e
router.get('/cart/:cid', ViewsController.renderViewsCart);

export {router as viewsRouter};//lo exportamos para poder importarlo en "app.js".
