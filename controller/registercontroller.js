const User = require('../model/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TOKEN_SECRET } = require('../config/utils');

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!(firstName && lastName && email && password)) {
            res.status(400).send("Please fill all the fields!!!");
        }

        else if (await User.findOne({ email: email })) {
            res.status(400).send("User was created before!!!");
        }

        else {
            const encryptedPass = await bcrypt.hash(password, 10);
            let newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: encryptedPass
            });            
            newUser.save().then((user) => {
                let token = jwt.sign(
                    { user_id: user._id, email }, TOKEN_SECRET, { expiresIn: "2h" }
                );
                user.token=token;
                user.save();
                res.status(201).send("User is created");
            }).catch((err) => console.log(err));
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUser };