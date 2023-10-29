const bcrypt = require('bcrypt');
const Customer = require('../../model/customer');

async function CustomerRegistration(data) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newCustomer = await Customer.create({
        name: data.name,
        surname: data.surname,
        sex: data.sex,
        address: data.address,
        id_type: data.id_type,
        id_number: data.id_number,
        email_address: data.email_address,
        hashed_password: hashedPassword
    });
    
    return newCustomer;
}

module.exports = CustomerRegistration;