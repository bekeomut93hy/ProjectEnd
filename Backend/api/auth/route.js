const express = require('express');
const router = express.Router();
const Nexmo = require("nexmo");
const UserModel = require("./model")
const nexmo = new Nexmo({
    apiKey: '7f1a9393',
    apiSecret: 'HG21oDgHWTfVvmnK'
})
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
router.get("/loginSms", (req, res) => {
    let contact = req.body.contact;
    const OTP = Math.floor((Math.random() * 100000) + 1)
    const from = 'Tinder'
    const to = `${contact}`
    const text = `Your code is ${OTP}`
    nexmo.message.sendSms(from, to, text)
    res.json({ message: "OK" });
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
module.exports = router;