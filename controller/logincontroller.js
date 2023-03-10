const User = require('../model/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TOKEN_SECRET } = require('../config/utils');

const checkUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("Please fill all the fields!!!");
        }

        else {
            const currentUser = await User.findOne({ email: email });
            const passCompare = await bcrypt.compare(password, currentUser.password);
            if (currentUser && passCompare) {
                let token = jwt.sign(
                    { user_id: currentUser._id, email }, TOKEN_SECRET, { expiresIn: "2h" }
                );
                console.log(token);
                currentUser.token = token;
                currentUser.save().then(() => {
                    req.token=token;
                    res.status(200).send("Login is successfull");
                }).catch((err) => console.log(err));
            }
            else{
                res.status(400).send("Login is unsuccessfull");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { checkUser };