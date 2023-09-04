const router = require('express').Router();
const { User } = require('../../models');

//Login Route//
router.post('/signup', async (req,res)=>{
    try {
        const signupUser = await User.create({
            email: req.body.email,
            user_name: req.body.user_name,
            password: req.body.password,
        })
        res.status(200).json(dbUserData)
        
    } 
    catch (error) {
        console.log(err);
        res.status(500).json(err)
    }

    })

router.post('/login', async (req, res)=>{
    try {
        const userData = await User.findOne({
            email: req.body.email
        }) 

        if(!userData){
            res.status(404).json({message: 'Incorrect email or password, please try again!'})
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if(!validPassword){
            res.status(404).json({message: 'Incorrect email or password, please try again!'})
            return;
        }
        else{
            req.session.save(() => {
                req.session.id = userData.id;
                req.session.loggedIn = true;

                res.json({message: 'You are now logged in'})
            })
        }
    } 
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})



module.exports = router;