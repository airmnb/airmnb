'user strict';
import * as express from 'express';
import { Account, LoginInfo } from "../../types";
import { dataGatewayFactory } from "../data/gateway";
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

export const router = express.Router();


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('OK');
});

/**
 * Generic creating data
 */
router.post('/data/:typeName', (req, res) => {
  const typeName = req.params.typeName;
  const item = req.body;
  if (!typeName){
    res.status(400).end('No typeName detected from routing URL.');
  }
  if (!item) {
    res.status(400).end('No body detected from the request.');
  }

  const gateway = dataGatewayFactory.produce(typeName);
  gateway.create(item)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(e => {
      res.status(500).json(e);
    });
});

/**
 * Generic get one object
 */
router.get('/data/:typeName', (req, res) => {
  const typeName = req.params.typeName;
  const query = req.query || {};
  const gateway = dataGatewayFactory.produce(typeName);
  gateway.queryOne(query)
  .then(x => {
    res.json(x);
  })
  .catch(e => {
    res.status(500).json(e);
  });
});

// /**
//  * Generic list objects by query
//  */
// router.get('/data/:typeName/list', (req, res) => {
//   const typeName = req.params.typeName;
//   const query = req.query || {};
//   const gateway = dataGatewayFactory.produce(typeName);
//   gateway.query(query)
//   .then(list => {
//     res.json(list);
//   })
//   .catch(e => {
//     res.status(500).json(e);
//   });
// });

/**
 * For complex queries.
 */
router.post('/data/:typeName/list', (req, res) => {
  const typeName = req.params.typeName;
  let limit = 100;
  try {
    limit = parseInt(req.query.limit, 10);
  }catch(e) {
    // Who cares
  }
  const query = req.body || {};
  const gateway = dataGatewayFactory.produce(typeName);
  gateway.query(query, limit)
  .then(list => {
    res.json(list);
  })
  .catch(e => {
    res.status(500).json(e);
  });
});

/**
 * Generic get one object by id
 */
router.get('/data/:typeName/:id', (req, res) => {
  const typeName = req.params.typeName;
  const query = {id: req.params.id};
  const gateway = dataGatewayFactory.produce(typeName);
  gateway.queryOne(query)
  .then(x => {
    res.json(x);
  })
  .catch(e => {
    res.status(500).json(e);
  });
});

/**
 * Generic update one object by id
 */
router.put('/data/:typeName/:id', (req, res) => {
  const typeName = req.params.typeName;
  const id = req.params.id;
  const item = req.body;
  item.id = id;
  const gateway = dataGatewayFactory.produce(typeName);
  gateway.update(item)
  .then(x => {
    res.json(x);
  })
  .catch(e => {
    res.status(500).json(e);
  });
});

/**
 * Generic update one object by id
 */
router.delete('/data/:typeName/:id', (req, res) => {
  const typeName = req.params.typeName;
  const id = req.params.id;
  const gateway = dataGatewayFactory.produce(typeName);
  gateway.delete(id)
  .then(x => {
    res.json(x);
  })
  .catch(e => {
    res.status(500).json(e);
  });
});

/**
 * Login
 */
router.post('/login', (req, res) => {
  const info: LoginInfo = req.body;
  if (!info || !info.name || !info.password) {
    res.sendStatus(400);
  }

  const accountGateway = dataGatewayFactory.produce('account');
  const query = {
    name: info.name,
    secret: info.password
  };
  accountGateway.queryOne(query)
    .then((x: Account) => {
      delete x.secret;
      if (x.enabled){
        res.json(x);
      }else {
        res.sendStatus(404);
      }
    })
    .catch(e => {
      res.status(500).json(e);
    });
});
