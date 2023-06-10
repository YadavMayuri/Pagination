import UsersModal from "../modals/UsersModal.js";
import encrypt from 'encryptjs';
export const checkpin = async (req, res, next) => {
    try {
        const {email,pin } = req.body;
        var secretkey = 'ios';
        if (!pin) return res.send("Pin is required - middleware");
        const response = await UsersModal.find({ email }).exec()
        // console.log(response, "resp");
        var decipherPin = encrypt.decrypt(response[0].pin, secretkey, 256);
        console.log("Deciphered Text is : " + decipherPin);
        
        if ( decipherPin === pin) {
            next();
        } else {
            return res.send("Incorrect Pin! - middleware")
        }
    } catch (error) {
        res.send(error)
    }
}