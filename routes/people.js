//import express and express router as shown in lecture code and worked in previous labs
import {Router} from 'express';
const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET
});

router.route('/searchpeople').post(async (req, res) => {
  //code here for POST
});

router.route('/persondetails').get(async (req, res) => {
  //code here for GET
});

//export router
export default router;