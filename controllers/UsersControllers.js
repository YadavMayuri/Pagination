import Users from "../modals/UsersModal.js";
import encrypt from 'encryptjs';

export const register = async (req, res) => {
    // return res.send("Hi from register...")

    try {
        const { userName, userEmail, userPassword, userConfirmPassword } = req.body;
        if (!userName) return res.send("User name is requierd!");
        if (!userEmail) return res.send("User email is required!")
        if (!userPassword) return res.send("User Password is required!")
        if (!userConfirmPassword) return res.send("User Confirm Password is required!")
        var secretkey = 'ios';
        var plaintext = userPassword;
        var cipherText = encrypt.encrypt(plaintext, secretkey, 256);
        // console.log(cipherText+" ****************** ");

        if (userPassword.length < 8) {
            return res.send("User Password length is less than 8 !")
        }
        if (userConfirmPassword.length < 8) {
            return res.send("User Confirm Password length is less than 8 !")
        }
        if (userPassword != userConfirmPassword) {
            return res.send("Password and Confirm Password Not matched!!")
        }
        const response = await Users.find({ email: userEmail }).exec();
        // console.log(response,"response")      .exec() = shows exact error
        if (response.length) {
            return res.send("Email is already Taken or You are already resgistered!!");
        }
        const user = new Users({
            name: userName,
            email: userEmail,
            password: cipherText
        });
        await user.save();
        return res.send("Resgistration Succesfull!")
    } catch (error) {
        return res.send(error)
    }
}



//login

export const login = async (req, res) => {
    // return res.send("Hi from login...")
    try {
        const { userEmail, userPassword } = req.body
        if (!userEmail) return res.send("User email is required")
        if (!userPassword) return res.send("User password is required")

        const response = await Users.find({ email: userEmail }).exec()
        var secretkey = 'ios';
        var decipher = encrypt.decrypt(response[0].password, secretkey, 256);
        console.log("Deciphered Text is : " + decipher, "- here");


        // console.log(response, "response");

        if (response.length) {
            if (decipher === password) {
                return res.send("You are logged in")

            } else {
                return res.send("Wrong pwssored")
            }
        } else {
            return res.send("user not found.")
        }

    } catch (error) {
        return res.send("You are logged in")
    }

}
