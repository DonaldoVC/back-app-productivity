import express = require('express');
import * as bodyParser from 'body-parser';
import AppController from './controllers';

require ('./utils/connection');

const cors = require('cors');

class App {
  public express: any;
  private controller: AppController;

  constructor () {
    this.express = express();
    this.express.use(cors({ origin:true }));
    this.controller = new AppController();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares (): void {
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  }

  private initializeRoutes (): void {
    const router = express.Router();
    router.use('/productivity', this.controller.router);
    this.express.use('/', router);
  }
}

export default new App().express;
