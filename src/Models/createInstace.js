const { insertInstance } = require("../Config/DatabaseConfig");
const Category = require("./Category.model");
const Gender = require("./Gender.model");
const Product = require("./Product.model")
const Size = require("./Size.model")
const Image = require("./Image.model")
//Crete new gender
const genderNew = new Gender({Name: "Thời trang nam"})
//insertInstance(genderNew)

//Create new category associate with gender
Gender.hasMany(Category)
Category.belongsTo(Gender)
const categoryNew = new Category({Name: "Áo khoác", GenderIdGender: 1})
//insertInstance(categoryNew)

//Create new Product associate with Category
Category.hasMany(Product)
Product.belongsTo(Category)
const productSecond = new Product({Name: "Áo khoác bomber nam dáng đẹp thể thao", Description: "Ao khoac nam cuc dep cho mua dong", Price: 1000000, CategoryIdCat: 2})
const productThird = new Product({Name: "Áo khoác dù nam hai mặt cực đẹp", Description: "Ao khoac du nam cho moi thoi tiet", Price: 600000, CategoryIdCat: 2})
const productFourth = new Product({Name: "Áo khoác nam thêu logo cao cấp chất dù 2 lớp dày dặn thoải mái đi mưa", Description: "Ao khoac du cho moi thoi tiet", Price: 700000, CategoryIdCat: 2})
/*
insertInstance(productSecond)
insertInstance(productThird)
insertInstance(productFourth)
*/

//Create size of each product
Product.hasMany(Size)
Size.belongsTo(Product)
const size4First = new Size({Name: "M", Quantity: 25, ProductIdProduct: 4})
const size4Second = new Size({Name: "L", Quantity: 15, ProductIdProduct: 4})
const size4Third = new Size({Name: "XL", Quantity: 16, ProductIdProduct: 4})
const size4Fourth = new Size({Name: "XXL", Quantity: 25, ProductIdProduct: 4})
//insertInstance(size4First)
//insertInstance(size4Second)
//insertInstance(size4Third)
//insertInstance(size4Fourth)

//Create image of each product
Product.hasMany(Image)
Image.belongsTo(Product)
const img4First = new Image({Path: "Prod_4/img1", ProductIdProduct: 4})
const img4Second = new Image({Path: "Prod_4/img2", ProductIdProduct: 4})
const img4Third = new Image({Path: "Prod_4/img3", ProductIdProduct: 4})
//insertInstance(img4First)
//insertInstance(img4Second)
//insertInstance(img4Third)
const getAllProduct = async() => {
    const products  = await Gender.findAll({
        include: [ 
            {
                model: Category,
                required: true,
                include: {
                    model: Product,
                    required: true,
                    include: [
                        {
                            model: Size,
                            required: true
                        },
                        {
                            model: Image,
                            required: true
                        }
                    ]
                }
            }
        ]
    });
    // Now the ship comes with it
    return products 
    //JSON.stringify(products, null, 2)
}
module.exports = getAllProduct