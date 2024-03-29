const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth')

router.get('/add', isLoggedIn,(req, res) =>{
    res.render('links/add');
});

router.post('/add', isLoggedIn, async(req, res)=> {
    const{title, description} = req.body;
    const newLink ={
        title, 
        description
    };
    await pool.query('INSERT INTO clients set ?',[newLink]);
    req.flash('success', 'Cliente Creado')
    res.redirect('/links')
});

router.get('/', isLoggedIn, async(req, res)=>{
    const links = await pool.query('SELECT * FROM clients');
    res.render('links/list', {links});
})

router.get('/delete/:id', isLoggedIn, async(req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM clients WHERE ID = ?',[id] );
    req.flash('success', 'Cliente Eliminado');
    res.redirect('/links');
} ) 

router.get('/edit/:id', isLoggedIn, async(req, res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
})

router.post('/edit/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    const {title, description} = req.body;
    const newLink= {
        title, 
        description
    };
    await pool.query('UPDATE clients set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Cliente Actualizado');
    res.redirect('/links');
} );


module.exports = router;