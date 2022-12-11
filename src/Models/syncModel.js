const Admin = require("./Admin.model")
const Gender = require("./Gender.model")
const Category = require("./Category.model")
const Product = require("./Product.model")
const Size = require("./Size.model")
const Image = require("./Image.model")
const CustomerOrder = require("./CustomerOrder.model")
const PhoneNumber = require("./PhoneNumber.model")
const Checkout = require("./Checkout.model")
Gender.hasMany(Category)
Category.belongsTo(Gender)
Category.hasMany(Product)
Product.belongsTo(Category)
Product.hasMany(Size)
Size.belongsTo(Product)
Product.hasMany(Image)
Image.belongsTo(Product)
CustomerOrder.hasMany(PhoneNumber)
PhoneNumber.belongsTo(CustomerOrder)
CustomerOrder.belongsToMany(Product, {through: Checkout})
Product.belongsToMany(CustomerOrder, {through: Checkout})
const syncModel = async() => {
    await Admin.sync({ force: true });
    console.log("The table for the Admin model was just (re)created!");
    await Gender.sync({ force: true });
    console.log("The table for the Gender model was just (re)created!");
    await Category.sync({force: true})
    console.log("The table for the Category model was just (re)created!");
    await Product.sync({force: true})
    console.log("The table for the Product model was just (re)created!");
    await Size.sync({force: true})
    console.log("The table for the Size model was just (re)created!");
    await Image.sync({force: true})
    console.log("The table for the Image model was just (re)created!");
    await CustomerOrder.sync({force: true})
    console.log("The table for the CustomerOrder model was just (re)created!");
    await PhoneNumber.sync({force: true})
    console.log("The table for the PhoneNumber model was just (re)created!");
    await Checkout.sync({force: true})
    console.log("The table for the Checkout model was just (re)created!");
}
syncModel()