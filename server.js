const path = require('path');
const express = require('express');
const session = require('express-session');
const expressHandleBars = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express();
const PORT = process.env.PORT || 3001;

//Setting up Handlebars engine with the custom helpers//
const handleBars = expressHandleBars.create({ helpers })

//Setting up session and connecting to our Sequelize DB//
const sess = {
    secret: 'Need a random ',
    cookie: {
        httpOnly: true, 
        secure: false, 
        maxAge: null, 
    },
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//Telling Express.js to use handlebars engine//
app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))

app.use(routes);

sequelize.sync({ force: false}).then(()=>{
    app.listen(PORT, () => console.log('Now listening'));
})