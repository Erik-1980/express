const express = require('express');
const sqlite = require('sqlite3').verbose();
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
const db = new sqlite.Database('data.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM TV ', [], (err, data) => {
        res.send(data)
    })
})

app.get('/brand/:id', (req, res)  => {
    const id = req.params.id
    db.all('SELECT * FROM TV WHERE brand_table_id=?', [id], (err, data) => {  // select * ????? ete minchev ches grum all meka bolor@ chi bacum
        res.send(data)
    })
})

app.get('/table/:id', (req, res) => {
    db.all('SELECT brand_table.brand, TV.name FROM brand_table JOIN TV ON brand_table.id = TV.brand_table_id WHERE brand_table.id = ?;', [req.params.id], (err, data) => { 
        res.send(data)
    })
})

app.use(express.json());
app.post('/post', (req,res) => {
    
    const name = req.body.name;
    const model = req.body.model;
    const screen_size = req.body.screen_size;
    const image = req.body.image;
    const price = req.body.price;
    const screen_type = req.body.screen_type;
    const quantity= req.body.quantity;
    const brand_table_id = req.body.brand_table_id

    db.run('INSERT INTO TV (name,model,screen_size,image,price,screen_type,quantity,brand_table_id) values (?,?,?,?,?,?,?,?)', [name,model,screen_size,image,price,screen_type,quantity,brand_table_id],(err) => {
        res.send("WELL")
    })
});
app.put('/put', (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const model = req.body.model;
    const screen_size = req.body.screen_size;
    const image = req.body.image;
    const price = req.body.price;
    const screen_type = req.body.screen_type;
    const quantity= req.body.quantity;
    const brand_table_id = req.body.brand_table_id

    db.run('UPDATE TV SET name=?, model=?, screen_size=?, image=?, price=?, screen_type=?, quantity=?, brand_table_id=? WHERE id=?', [name,model,screen_size,image,price,screen_type,quantity,brand_table_id,id],(err) => {
        res.send("WELL")
    })
});
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM TV WHERE id=?', [id], (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send(`Data with id ${id} has been deleted`);
      }
    });
  });
app.listen(port)