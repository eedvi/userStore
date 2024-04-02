import { availableParallelism } from "os";
import { CustomError } from "../errors/custom.errors";




export class ProductEntity {


    constructor(
        public name: string,
        public available: boolean,
        public price: number,
        public description: string,
        public user: string,
        public category: string,
    ) { }


    static fromObject(object: { [key: string]: any }) {

        const { name, available, price, description, user, category } = object;

        if (!name) throw CustomError.badRequest('Missing name');
        if (available === undefined) throw CustomError.badRequest('Missing available');
        if (!price) throw CustomError.badRequest('Missing price');
        if (!description) throw CustomError.badRequest('Missing description');
        if (!user) throw CustomError.badRequest('Missing user');
        if (!category) throw CustomError.badRequest('Missing category');

        return new ProductEntity(name, available, price, description, user, category);

    }


}


