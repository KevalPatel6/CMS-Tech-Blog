const router = require('express').Router();
const { User } = require('../../models');
const authenticate = require('../../utils/authenticate')

//Login Route//
router.post('/signup', async (req,res)=>{
    try {
        const signupUser = await User.create({
            user_name: req.body.user_name,
            password: req.body.password,
        })
        res.status(200).json(signupUser)
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

    })

router.post('/login', async (req, res)=>{
    try {
        const userData = await User.findOne({
            username: req.body.username
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
                req.session.userID = userData.id;
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

router.get('/logout', authenticate, async (req, res)=>{
    try {
        res.session.destroy();
        res.render('homepage')
    } 
    catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

module.exports = router;