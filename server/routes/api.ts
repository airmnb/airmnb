'user strict';
import * as express from 'express';
import { Account, LoginInfo } from "../../types";
import { dataGatewayFactory } from "../data/gateway";
import { loadCollection, imageFilter } from './utils';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';
import * as Loki from 'lokijs';
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

/**
 * Generic list objects by query
 */
router.get('/data/:typeName/list', (req, res) => {
  const typeName = req.params.typeName;
  const query = req.query || {};
  const gateway = dataGatewayFactory.produce(typeName);
  gateway.query(query)
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

/**
 * Upload image
 */
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

router.post('/image', upload.single('image'), async (req, res) => {
  try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const data = col.insert(req.file);

      db.saveDatabase();
      res.send({
        id: data.$loki,
        fileName: data.filename,
        originalName: data.originalname });
  } catch (err) {
      res.sendStatus(400);
  }
});

// router.post('/image', upload.array('photo', 10), async (req, res) => {
//   try {
//       const col = await loadCollection(COLLECTION_NAME, db);
//       const data = [].concat(col.insert(req.files));

//       db.saveDatabase();
//       res.send(data.map(x => ({
//         id: x.$loki,
//         fileName: x.filename,
//         originalName: x.originalname
//       })));
//   } catch (err) {
//       res.sendStatus(400);
//   }
// });

router.get('/image', async (req, res) => {
  try {
      const col = await loadCollection(COLLECTION_NAME, db);
      res.send(col.data);
  } catch (err) {
      res.sendStatus(400);
  }
});

router.get('/image/:id', async (req, res) => {
  try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const result = col.get(req.params.id);

      if (!result) {
          res.sendStatus(404);
          return;
      }

      res.setHeader('Content-Type', result.mimetype);
      fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
  } catch (err) {
      res.sendStatus(400);
  }
});
