const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/group.user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/bulk')
  .post(asyncHandler(insertBulk));

router.route('/')
  .get(asyncHandler(get));

router.route('/phone')
  .get(asyncHandler(getPhone));


async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function insertBulk(req, res) {
  let user = await userCtrl.insertBulk(req.body.data);
  res.json(user);
}

async function get(req, res) {
  let user = await userCtrl.get(req.body);
  res.json(user);
}

async function getPhone(req, res) {
  let user = await userCtrl.getPhoneByUid(req);
  res.json(JSON.parse(user));
}
