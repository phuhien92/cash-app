import express, {Request,Response} from 'express';

const router = express.Router();

router.post('/test', (req,res) => {
    return res.status(200).json({status: 'post good'})
})

export default router;
