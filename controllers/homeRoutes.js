const router = require('express').Router();
const {User, Blog, Comment} = require('../models')
const authenticate = require('../utils/authenticate')


router.get('/', async (req, res)=>{
    try {
        const techBlogData = await Blog.findAll({
            include:[{model: User}]
        })
        
        const techBlogs = techBlogData.map((techBlog)=> techBlog.get({plain:true}));
        console.log(techBlogs)
        res.render('homepage', {techBlogs})
    
    
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/login', async (req, res)=>{
    try {
        res.render('login')
    } 
    catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/signup', async (req, res)=>{
    try {
        res.render('signup')
    } 
    catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

//Should this be under API

router.get('/dashboard', authenticate, async (req, res)=>{
    try {
        const techBlogData = await Blog.findAll({
            where: {
                user_id: req.session.userID
            },
            include:[User]
        })
        
        const techBlogs = techBlogData.map((techBlog)=> techBlog.get({plain:true}));
        
        res.render('dashboard', {
            newTitle: "Dashboard",
            techBlogs: techBlogs,
        })
    } 
    catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/newPost', authenticate, async (req, res)=>{
    try {
        res.render('newPost')

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

//Get Blog by ID//
router.get('/blog/:id', authenticate, async (req,res)=>{
    try {
        let blogs = await Blog.findByPk(req.params.id, {
            include: [{model: Comment},{model: User}]
        })
        
        blogs = blogs.get({plain:true});
        console.log(blogs)
        res.render('comment', {
            ...blogs
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Service Error, unable to post your blog, please try again.'})
    }

})
module.exports = router