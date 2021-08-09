const express = require('express'),
    app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const jwt = require('jsonwebtoken'),
    mongo = require('mongodb').MongoClient,
    url = "mongodb://localhost:27017/Authentication",
    dep = { useNewUrlParser: true, useUnifiedTopology: true },
    { ObjectID, ObjectId } = require('bson'),
    config = require('./config/config.json');
let db;

mongo.connect(url, dep).then((client) => {
    db = client.db();
    console.log("Database Connected successfully!");
    app.listen(config.port, () => console.log(`Server running on ${config.port}`));
}).catch((err) => console.log('Error making a database connection'));

const auth = async (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.secretKey);
        const user = await db.collection('users').findOne({ 'phone': decoded.phone, 'token': token })
        if (!user) throw new Error();
        req.user = user
        next();
    } catch (error) {
        res.status(404).send('Please authenticate!');
    }
}

const generateToken = async (phone) => {
    return jwt.sign({ phone: phone }, config.secretKey)
}

app.post('/user/register', async (req, res) => {
    try {
        const token = await generateToken(req.body.phone);
        req.body.token = token;
        const user = await db.collection('users').insertOne(req.body);
        res.status(201).send(user.ops[0]);
    } catch (error) {
        res.status(404).send('Error in registering a user');
    }
});

app.post('/user/login', async (req, res) => {
    try {
        const user = req.body;
        const user = await db.collection('users').findOne({name: user.name, phone: user.phone});
        let updateData = {
            $set: {
                'token': await generateToken(user.phone)
            }
        }
        const currentUser = await db.collection('users').findOneAndUpdate({ _id: ObjectID(user._id) }, updateData, {returnOriginal: false});
        if(!currentUser) throw new Error()
        res.send(currentUser.value)
    } catch (error) {
        res.status(404).send('Invalid credentials');
    }
})

app.get('/user/logout', auth, async (req, res) => {
    try {
        const user = req.user;
        const updateData = {
            $set: {
                'token': undefined
            }
        }
        const logout = await db.collection('users').findOneAndUpdate({'_id': ObjectID(user._id)}, updateData);
        res.send('Logged out successfully!')
    } catch (error) {
        res.status(404).send('Error in logging out');
    }
})

app.get('/user/details', auth, (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(404).send('Error in fetching a user');
    }
});

app.delete('/user/delete', auth, async (req, res) => {
    try {
        const user = req.user;
        const deletedUser = await db.collection('users').findOneAndDelete({ 'phone': user.phone });
        res.send(deletedUser)
    } catch (error) {
        res.status(404).send('Error in deleting a user');
    }
});

app.put('/user/update', auth, async (req, res) => {
    try {
        const reqBody = req.body;
        const updateData = {
            $set:
            {
                'phone': reqBody.phone,
                'name': reqBody.name,
                'token': await generateToken(reqBody.phone)
            }
        }
        const user = await db.collection('users').findOneAndUpdate({ _id: ObjectID(req.user._id) }, updateData, {returnOriginal: false});
        res.send(user.value)
    } catch (error) {
        res.status(404).send('Error in updating a user');
    }
});

app.post('/task/create', auth, async (req, res) => {
    try {
        const taskdata = req.body;
        const createData = {
            title: taskdata.title,
            description: taskdata.description,
            user: new ObjectId(req.user._id),
            createdAt: new Date()
        }
        const task = await db.collection('tasks').insertOne(createData);
        res.status(201).send(task.ops[0]);
    } catch (error) {
        res.status(404).send('Error in creating a task');
    }
});

app.get('/task/list', auth, async (req, res) => {
    try {
        const user = req.user._id;
        const tasks = await db.collection('tasks').find({user}).toArray()
        res.send(tasks);
    } catch (error) {
        res.status(404).send('Error in fetching tasks');
    }
});

app.delete('/task/delete', auth, async (req, res) => {
    try {
        id = req.body.id;
        deletedTask = await db.collection('tasks').deleteOne({ '_id': ObjectId(id) });
        res.send(deletedTask);
    } catch (error) {
        res.status(404).send('Error in deleting tasks');
    }
});
