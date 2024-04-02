import { envs } from "../../config";
import { CategoryModel, MongodataBase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";



(async () => {
    await MongodataBase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,

    })

    await main();

    await MongodataBase.disconnect();

})();

const randomBetween0AndX = (x: number) => {
    return Math.floor(Math.random() * x);
}


async function main() {

    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])
    //Creating users
    const users = await UserModel.insertMany(seedData.users);
    //Creating categories
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {
            return {
                ...category,
                user: users[0]._id
            }
        })
    );

    // Creating products

    const products = await ProductModel.insertMany(
        seedData.products.map(product => {
            return {
                ...product,
                user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
                category: categories[randomBetween0AndX(seedData.categories.length - 1)]._id,
            }
        })
    )




}