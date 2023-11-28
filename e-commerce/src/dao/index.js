//Aca importamos los Managers para crear nuestros servicios, instanciando a cada modulo y le pasamos el "path",
//y los exportamos para poder utilizarlos otras partes del codigo.

//import { ProductsManager } from "./files/productsManager.js";
//import { CratsManager } from "./files/cartsManager.js";

import { __dirname } from "../utils.js"; //importamos la variable "__dirname" para tener disponible un punto de referencia de nuestros archivos.
import path from "path"; //instalamos esta libreria de Nodejs que ya viene integrada. Me ayuda a unir diferentes rutas.

import { ProductsManagerMongo } from "./managers/mongo/productsManagerMongo.js";
import { ChatsManagerMongo } from "./managers/mongo/chatsManagerMongo.js";
import { CartsManagerMongo } from "./managers/mongo/cartsManagerMongo.js";
import { UsersManagerMongo } from "./managers/mongo/usersManagerMongo.js";
import { TiketManagerMongo } from "./managers/mongo/tiketManagerMongo.js";

//export const productsService = new ProductsManager(path.join(__dirname,"/data/products.json"));
//export const cartsService = new CratsManager(path.join(__dirname,"/data/carts.json"));

export const productsDao = new ProductsManagerMongo();
export const chatsDao = new ChatsManagerMongo()
export const cartsDao = new CartsManagerMongo();
export const usersDao = new UsersManagerMongo();
export const tiketDao = new TiketManagerMongo()