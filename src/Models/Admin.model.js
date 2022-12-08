const { DataTypes, Sequelize, Model } = require("sequelize");
const {sequelize} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize")
class Admin extends Model {
    static classLevelMethod() {
        return 'Admin'
    }
    instanceLevelMethod() {
        return 'bar'
    }
    getUserNameAndPassword() {
        return [this.UserName, this.Password].join(' ')
    }
    static checkAdmin(userName, password) {
            const admin  = Admin.findAll({
                where: {
                    [Op.and]: [{UserName: userName}, {Password:password}]
                }
            });
            // Now the ship comes with it
            return admin
    }
}

Admin.init({
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    UserName: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.CHAR,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Admin',
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: 'updateTimestamp'
});
// Create admin user and insert to database
/*
console.log(Admin.classLevelMethod())
const adminNew = Admin.build({UserName: "HuyGG", Password: "Huyz"})
console.log(adminNew.instanceLevelMethod())
console.log(adminNew.getUserNameAndPassword())
const saveAdmin = async() => {
    await adminNew.save()
    console.log(adminNew.toJSON())
}
saveAdmin()
*/

//Restrict the User model to set only an username but not an admin flag
/*
const user = await User.create({
  username: 'alice123',
  isAdmin: true
}, { fields: ['username'] });
// let's assume the default of isAdmin is false
console.log(user.username); // 'alice123'
console.log(user.isAdmin); // false
*/

//Save paticular column and reload
/*
const adminNew = async() => {
    const huyBui = await Admin.create({UserName: "K", Password: "vc"})
    huyBui.save({fields: ['UserName']})
    huyBui.reload()
}
adminNew()
*/

//Find all ADmins
// Find all users
const queryUsers = async() => {
    const users = await Admin.findAll();
    console.log(users.every(user => user instanceof Admin)); // true
    console.log("All ADmin:", JSON.stringify(users, null, 2));
}
//queryUsers()

//Specifying attributes for SELECT queries
const findWithAttr = async() => {
    const admins = await Admin.findAll({
        attributes: ['UserName']
    })
    console.log(JSON.stringify(admins, null, 2))
}
//findWithAttr()

//Applying WHERE clauses
const findSpec = async() => {
    const admins = await Admin.findAll({
        where: {
            Id: 1
        }
    })
    console.log(JSON.stringify(admins))
}
//findSpec()

//Use Op
const useOp = async () => {
    const admins = await Admin.findAll({
        where: {
            [Op.and]: [
                { Id: 3 },
                { UserName: 'Thien' }
            ]
        }
    });
    console.log(JSON.stringify(admins, null, 2))
}
//useOp()
//Create table and force to create table
const syncModel = async () => {
    await Admin.sync({ force: true });
    console.log("The table for the Admin model was just (re)created!");
}
//syncModel()
module.exports=Admin