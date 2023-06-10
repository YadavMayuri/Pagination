import Users from "../modals/UsersModal.js";
import encrypt from 'encryptjs';

export const register = async (req, res) => {
    // return res.send("Hi from register...")

    try {
        const { name, email, userPassword, userConfirmPassword, pin } = req.body;
        if (!name) return res.send("User name is requierd!");
        if (!email) return res.send("User email is required!")
        if (!userPassword) return res.send("User Password is required!")
        if (!userConfirmPassword) return res.send("User Confirm Password is required!")
        if (!pin) return res.send("Pin is required!")

        var secretkey = 'ios';
        var plaintext = userPassword;
        var plaintextForPin = pin;
        var cipherText = encrypt.encrypt(plaintext, secretkey, 256);
        var cipherTextForPin = encrypt.encrypt(plaintextForPin, secretkey, 256);

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
        const response = await Users.find({ email: email }).exec();
        // console.log(response,"response")      .exec() = shows exact error
        if (response.length) {
            return res.send("Email is already Taken or You are already resgistered!!");
        }
        const user = new Users({
            name: name,
            email: email,
            password: cipherText,
            pin: cipherTextForPin
        });
        await user.save();
        return res.send("Resgistration Succesfull!")
    } catch (error) {
        return res.send(error)
    }
}



// //login

export const login = async (req, res) => {
    // return res.send("Hi from login...")
    try {
        const { email, userPassword } = req.body
        if (!email) return res.send("User email is required")
        if (!userPassword) return res.send("User password is required")

        const response = await Users.find({ email: email }).exec()
        var secretkey = 'ios';
        var decipher = encrypt.decrypt(response[0].password, secretkey, 256);
        console.log("Deciphered Text is : " + decipher);

        console.log(response, "response");
        if (response.length) {
            if (decipher === userPassword) {
                console.log("logged");
                return res.send("You are logged in")

            } else {
                return res.send("Wrong pwssored")
            }
        } else {
            return res.send("user not found.")
        }

    } catch (error) {
        return res.send(error)
    }

}


//Update user


export const updateUser = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email) return res.send("Email not found!")
        if (!name) return res.send("Name not found!")
        const response = await Users.find({email}).exec();
        console.log(response, "response here");

        if (response) {
            const user = await Users.findOneAndUpdate({ email }, { name : name }).exec();
            await user.save()
            // console.log(user,"updated record");
            return res.send("User Record updated!")
           
        }else{
            return res.send("User not found!")
        }

    } catch (error) {
        res.send(error)
    }
}
