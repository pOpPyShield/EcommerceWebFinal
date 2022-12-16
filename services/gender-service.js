const Gender = require("../models/index")['Gender']
class GenderService{
    async findAllGender() {
        return await Gender.findAllGender()
    }
}
let testService = new GenderService()
const result = async() => {
    const data = await testService.findAllGender();
    console.log(data)
}
result()