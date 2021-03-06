const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) =>{
    res.render('links/add');
});

router.post('/add', async(req, res)=> {
    const{title, description} = req.body;
    const newLink ={
        title, 
        description
    };
    await pool.query('INSERT INTO clients set ?',[newLink]);
    res.redirect('/links')
});

router.get('/', async(req, res)=>{
    const links = await pool.query('SELECT * FROM clients');
    res.render('links/list', {links});
})

router.get('/delete/:id', async(req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM clients WHERE ID = ?',[id] );
    res.redirect('/links');
} ) 

router.get('/edit/:id', async(req, res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
    res.render('links/edit', {links: links[0]});
})

router.post('/edit/:id', async(req, res) =>{
    const {id} = req.params;
    const {title, description} = req.body;
    const newLink= {
        title, 
        description
    };
    await pool.query('UPDATE clients set ? WHERE id = ?', [newLink, id]);
    console.log(newLink);
    res.redirect('/links');
} );


module.exports = router;