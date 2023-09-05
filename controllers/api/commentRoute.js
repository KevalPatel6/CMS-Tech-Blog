const router = require('express').Router();
const { Comment } = require('../../models');
const authenticate = require('../../utils/authenticate');

router.post('/', authenticate, async (req,res)=>{
    try {
        const comment = await Comment.create(req.body)
        res.json(comment)
        
    } catch (error) {
        res.status(500).json({message:'Internal Service Error, unable to post your comment, please try again.'})
    }

})

router.delete('/', authenticate, async (req, res)=>{
    try {
        const deletedComment = await Comment.destroy()
        res.json(deletedComment)
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error, unable to delete this blog, please try again'})
    }
})

//Still need to do update//

// router.put()


module.exports = router;