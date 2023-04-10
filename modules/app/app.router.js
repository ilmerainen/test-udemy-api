import express from 'express';

const router = express.Router();

router.get('/', function (req, res, next) {
  res.send({
    data: new Date(),
  });
});

export { router };
