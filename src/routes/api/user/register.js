import express from 'express';

const registerRouter = express.Router();

registerRouter.post('/api/user/register', (req, res) => {
    console.log('register', req.body);
    res.json(req.body);
});

export { registerRouter };
