const express = require('express');
const router = express.Router();
const Nexmo = require("nexmo");
const UserModel = require("./model")
const FB = require('fb');
const Axios = require('axios')
const nexmo = new Nexmo({
    apiKey: '7f1a9393',
    apiSecret: 'HG21oDgHWTfVvmnK'
})
//setting fb

//get session
router.get("/getId", async (req, res) => {
    if (req.session.user) {
        const _id = req.session.user._id;
        const user = await UserModel.findById(_id).exec();
        res.status(200).json({ user: user });
    }
    else
        res.status(200).json({ user: "Unknown" });
})
// check login
router.get("/isLoggin", async (req, res) => {
    let check = false;
    if (req.session.user) check = true;
    res.status(200).json({ check: check })
})
//loginfb
router.post("/loginfb", async (req, res) => {
    try {
        const checkUser = await UserModel.findOne({ fbId: req.body.userFb.fbId }).exec();
        if (checkUser) {
            req.session.user = {
                _id: checkUser._id
            }
            req.session.save();
            res.status(201).json({ message: "Exist account" });
        }
        else {
            const newUser = await UserModel.create({
                accessToken: req.body.userFb.accessToken,
                name: req.body.userFb.name,
                fbId: req.body.userFb.fbId,
                email: req.body.userFb.email,
                avatarUrl: req.body.userFb.avatarUrl
            });
            console.log(newUser);
            req.session.user = {
                _id: newUser._id
            };
            req.session.save();
            res.status(201).json({ message: "Create account" });
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});
// Send sms
router.post("/loginSms", async (req, res) => {
    try {
        const validcontact = /(84)+(9\d|3[2-8]|8[1-5]|7[0|6|7|8|9])+([0-9]{7})$/;
        const contact = `84${req.body.contact}`;
        const user = await UserModel.findOne({ contact: { $eq: contact } }).exec();
        if (user) {
            //create session
            req.session.user = {
                _id: user._id
            };
            req.session.save();
            // send an OTP
            const OTP = Math.floor((Math.random() * 100000) + 1);
            await UserModel.updateOne({ _id: user._id }, { $set: { OTP: OTP } });
            const from = 'Tinder';
            const to = `${contact}`;
            const text = `Your code is ${OTP}`;
            nexmo.message.sendSms(from, to, text);
            res.status(201).json({ message: "OK" })
        }
        else {
            if (!contact.match(validcontact)) {
                res.status(201).json({ message: "Ko ton tai", isValid: false })
            }
            else {
                res.status(201).json({ message: "Ko ton tai", isValid: true })
            }
        }

    } catch (error) {
        console.log(error);
    }
})
//check OTP test
router.get("/checkOTPtest", (req, res) => {
})
//check OTP 
router.post("/checkOTP", async (req, res) => {
    try {
        const OTP = req.body.OTP;
        const user = await UserModel.findById(req.session.user._id).exec();
        if (user.OTP === OTP) {
            res.status(200).send({ success: true })
        }
        else {
            res.status(200).send({ success: false })
        }
    } catch (error) {

    }
})
// Log out
router.get("/logout", (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ message: "Logout" });
    } catch (error) {
        res.status(500).end(error.message);
    }
})
// Sent An Email to Verify Account
router.post("/verify-account", async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email }).exec();
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "dipperpine99@gmail.com",
            pass: "cancaiten030"
        }
    });
    const mainOption = {
        from: "Main Sever",
        to: `${user.email}`,
        subject: "Xác nhận tài khoản",
        text: `You recieved message form Main Sever`,
        html: `<h1> Link xác nhận tài khoản </h1><a href="http://localhost:3000/verify/${
            user._id
            }">http://localhost:3000/verify/${user._id}</a> `
    };
    transporter.sendMail(mainOption, (err, info) => {
        if (err) {
            console.log(err);
        }
        console.log(`Message send `);
    });
    res.json(user.email);
});
// Verify Account
router.post("/verify/:id", async (req, res, next) => {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { $set: { verify: true } });
    res.status(201).redirect('/');
});
// Get info from Facebook
router.get("/userfb", (req, res) => {
    const acctoken = req.body.acctoken;
    Axios({
        url: "https://graph.facebook.com/v3.2/me?access_token=EAAFNfuqa1O0BAN4iHTXbkrLxGk9CLL39rDoQwslPj5u3ZAFGJ6tGEWXghZAABlGD0zEGddZCz6G2Pmh2ZClSMPhKfw17nLtuZCnZB7CNxGc5rZBJJMQcj0beyKP2fzOcDlVuobPaV2Akuyfob94RsUmlPikLNkRKiK4wS4sfSdSQg2Cshzp8VZBuIpyVV9fIfys27JsrbolqhwZDZD&debug=all&fields=id,name&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors",
        method: "get"
    }).then((response)=>{

        res.json(response.data);
    })
})
module.exports = router;