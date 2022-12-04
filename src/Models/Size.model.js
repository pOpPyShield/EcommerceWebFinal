const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
const Product = require("./Product.model");
const Gender = require("./Gender.model")
const Category = require("./Category.model")
class Size extends Model {
    static classLevelMethod() {
        return 'Size'
    }
}
Size.init({
    IdSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {sequelize, modelName: "Size", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})

Product.hasMany(Size)
Size.belongsTo(Product)
const sizeNew = new Size({Name: "M", Quantity: 24, ProductIdProduct: 1})
//insertInstance(sizeNew)
const eagerLoading = async() => {
    const products  = await Gender.findAll({
        where: {
            Name: "Thời trang nam"
        },
        include: [ 
            {
                model: Category,
                required: true,
                where: {
                    Name: "Áo khoác"
                },
                include: {
                    model: Product,
                    required: true,
                    include: {
                        model: Size,
                        required: true
                    }
                }
            }
        ]
    });
    // Now the ship comes with it
    console.log(JSON.stringify(products, null, 2))
}
eagerLoading()
