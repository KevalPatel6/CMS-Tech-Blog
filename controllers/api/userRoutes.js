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


router.get()

router.delete()

router.put()


module.exports = router;