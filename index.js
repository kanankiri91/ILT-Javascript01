const express= require('express');
const mongoose = require('mongoose');
const port = 3000;
const app = express();
const Item = require('./db');

app.use(express.json());

mongoose.connect(`mongodb+srv://AlphaZero:GhKiuwAMzamgU7Q8@cluster0.aosfwos.mongodb.net/mfahrianda_ILTjavascript?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => console.log("Anda terhubung ke db anda !"));

app.get('/contacts', async (req, res) =>{
    const items = await Item.find({});
    try {
        res.status(200).send(items);
    }
    catch {
        res.status(500).send(`Internal Server Error`);
    }
});

app.post('/contacts', async (req, res) =>{
    const items = new Item(
    {
        id: req.body.id,
        name:req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    try {
        await Item.save();
        res.status(201).send("Create new contacts");
    }
    catch {
        res.status(500).send(`Internal Server Error`);
    }
});

app.delete('/contacts/:id', async (req,res) => {
    try {
        const items = await Item.findOneAndDelete(
            {
                id: req.body.id
            }
        );
        if (!items) {
            res.status(404).send("Not Found");
            return;            
        } else {
            res.status(200).send("Delete contacts");
            return;
        }        
    } catch {
        res.status(500).send(`Internal Server Error`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
