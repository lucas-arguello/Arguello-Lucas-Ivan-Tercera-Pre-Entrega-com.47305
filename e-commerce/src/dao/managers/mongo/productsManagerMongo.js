import mongoose  from "mongoose";

import { productsModel } from "./models/productsModel.js";

export class ProductsManagerMongo{
    constructor(){
        this.model = productsModel;
        
    };

    //Esta funcion es para crear el producto.
        
    async createProduct(productInfo){
        try {
            const product = await this.model.create(productInfo);
            return product;
        } catch (error) {
            console.log("createProduct",error.message);
            throw new Error("No se pudo crear el producto");
        }
    };

    //Esta funcion es para obtener el listado de productos.
    async getProducts(){
        try {
            //tilice el metodo ".lean()" para que me permitiera usar la propiedad "title"
            const products = await this.model.find().lean();
            return products;
        } catch (error) {
            console.log("getProducts",error.message);
            throw new Error("No se pudo obtener el listado de productos");
        }
    };

    //Esta funcion es para obtener un producto por su ID
    async getProductById(productId){
        try {
            const product = await this.model.findById(productId);
            return product;
        } catch (error) {
            console.log("getProductById",error.message);
            throw new Error("No se pudo obtener el producto");
        }
    };

    //Esta funcion es para actualizar un producto seleccionado por su ID.
    async updateProduct(prodcutId, newProduct){
        try {
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.findOneAndUpdate({_id: prodcutId}, newProduct, {new: true});//tambien se puede usar updateOne({_id: id}, product)
            if(!resultado){
                throw new Error('No se pudo encontrar el producto, para actualizarlo');
            }
            console.log('updateProduct con exito', resultado);
            return resultado
        } catch (error) {
            //mensaje interno
            console.log('Error en manager updateProduct',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo actualizar el producto',error.message);
        }
    }
    // async updateProduct(productId, newProductInfo){
    //     try {
    //         const product = await this.model.findByIdAndUpdate({_id:productId},newProductInfo,{new:true});
    //         if(!product){
    //             throw new Error("No se pudo encontrar el producto a actualizar");
    //         }
    //         return product;
    //     } catch (error) {
    //         console.log("updateProduct",error.message);
    //         throw new Error("No se pudo actualizar el producto");
    //     }
    // };

    //Esta funcion es para eliminar un producto seleccionado por su ID..
    async deleteProduct(productId){
        try {
            const product = await this.model.findByIdAndDelete(productId);
           
            if(!product){

                return null;
                //throw new Error("No se pudo encontrar el producto a eliminar");
            }
            console.log('Se elimino el producto:', product)
            
        } catch (error) {
            console.log("deleteProduct",error.message);
            throw new Error("No se pudo eliminar el producto");
        }
    };

    //metodo para obtener productos del paginate
    async getProductsPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options);
            return result
            
        } catch (error) {
            console.log('obtener producto',error.message);
            throw new Error('No se pudo obtener el listado de  producto',error.message);
        };
    };
};