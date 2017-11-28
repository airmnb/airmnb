'user strict';
import * as express from 'express';
import { Account } from "../../types";
import { dataGatewayFactory } from "../data/gateway";
export const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('OK');
});

router.post('/account', (req, res) => {
  const item: Account = req.body;
  console.log(item);

  const gateway = dataGatewayFactory.produce('account');
  gateway.create(item)
    .then(x => {
      res.status(201);
    })
    .catch(e => {
      console.log(e);
      res.status(500);
      res.end(e);
    });
});

