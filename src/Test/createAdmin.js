const { insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize")
const Admin = require("../Models/Admin.model")
const adminNew = new Admin({UserName: "OkDone", Password: "12358hjH"})
const checkAdmin =(async() => {
        var admin  = await Admin.findAll({
            where: {
                [Op.and]: [{UserName: "OkDone"}, {Password:"12358hjH"}]
            }
        });
        console.log(admin)
    })
checkAdmin()
