import express from 'express';

const loginRouter = express.Router();

loginRouter.post('/api/user/login', (req, res) => {
    console.log(req.body);
    res.end();
});

export { loginRouter };
