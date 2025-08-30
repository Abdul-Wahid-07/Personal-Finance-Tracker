import User from "../models/user.model.js";
import Contact from "../models/contact.model.js";

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome To Personal finance tracker using router");
    } catch (error) {
        console.log(error);
    }
};

//registration logic
const register = async (req, res) => {
    try {
        // console.log(req.body);

        const { username, email, income, password } = req.body;
        const UserExist = await User.findOne({ email })

        if(UserExist){
            return res.status(400).json({message: "user already exist"});
        }

        // to save to database we can .save() or .create() method;
        const newUser = await User.create({ username, email, income, password });

        res.status(201).json(
            {
                message: "Signup successful",
                token: await newUser.generateToken(),
                userId: newUser._id.toString(),
            }
        );
    } catch (error) {
        // res.status(500).json({ msg: "internal server error" });
        next(error);
    }
};

//login logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const UserExist = await User.findOne({email});
        console.log(UserExist);

        if(!UserExist){
            return res.status(400).json({msg: "Invalid Credentials"});
        }

        const check_password = await UserExist.comparePassword(password);

        if(check_password){
            res.status(200).json(
                {
                    message: "Login Successful",
                    token: await UserExist.generateToken(),
                    userId: UserExist._id.toString(),
                }
            );
        }
        else{
            res.status(401).json({ message: "Invalid email or password "});
        }

    } catch (error) {
        // res.status(500).json({ msg: "internal server error" });
        next(error);
    }
};

// contact logic
const contact = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ message: "Message send successfully" })
    } catch (error) {
        next(error);
    }
}

export default { home, register, login, contact };

