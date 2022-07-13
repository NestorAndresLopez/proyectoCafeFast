const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


//Initializations
const app = express();


//Settings
app.set('port', process.env.PORT || 4000 );
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoPropertiesByDefault:true,
        allowProtoMethodsByDefault:true,
    },
    layoutsDir: path.join(app.get('views'), 'layouts') ,
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handdlebars')
}));
app.set('view engine','hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());


//Global Variables
app.use((req, res, next)=>{
    next();
});



//Routes
app.use(require('./routes'));
app.use(require('./routes/authentications'));
app.use('/links', require('./routes/links'));


//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});
