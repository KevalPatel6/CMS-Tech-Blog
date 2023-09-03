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
