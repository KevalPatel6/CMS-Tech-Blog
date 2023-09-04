const router = require('express').Router();
const {User, Blog} = require('../models')


router.get('/', async (req, res)=>{
    try {
        const techBlogData = await Blog.findAll()
        
        const techBlogs = techBlogData.map((techBlog)=> techBlog.get({plain:true}));

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

router.get('/logout', async (req, res)=>{
    try {
        res.session.destroy();
        res.render('homepage')
    } 
    catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/dashboard', async (req, res)=>{
    try {
        const techBlogData = await Blog.findAll({
            where: {
                user_id: req.session.id
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