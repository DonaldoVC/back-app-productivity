import * as express from 'express';

import TaskController from './task.controller';
import SectionController from './section.controller';

class AppController {

  public router: express.Router;

  constructor() {
    const router = express.Router();

    const taskController = new TaskController();
    const sectionController = new SectionController();

    router.use('/task', taskController.router);
    router.use('/section', sectionController.router);

    this.router = router;
  }
}

export default AppController;
