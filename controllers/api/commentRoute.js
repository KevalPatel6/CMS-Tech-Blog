const router = require('express').Router();
const { Comment, User } = require('../../models');
const authenticate = require('../../utils/authenticate');
const dayjs = require('dayjs')


router.get('/', authenticate, async (req, res) => {
    try {
        let comments = await Comment.findAll({
            include:[{model:User}]
        })

        comments = comments.map(comment => comment.get({ plain: true }))
        console.log(comments)
        res.json(comments)

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error, could not retrieve comments' })
    }
})


router.post('/', authenticate, async (req, res) => {
    try {

        const comment = await Comment.create({
            ...req.body,
            user_id: req.session.userID,
            date_posted: dayjs().unix()*1000

        })
        console.log(comment)
        res.json(comment)

        return
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Service Error, unable to post your comment, please try again.' })
    }

})

router.delete('/', authenticate, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy()
        res.json(deletedComment)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error, unable to delete this comment, please try again' })
    }
})

//Still need to do update//

// router.put()


module.exports = router;