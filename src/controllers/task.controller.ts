import * as express from 'express';
import {Section, Task} from '../models';

class TaskController {

  public router: express.Router;

  constructor() {
    const router = express.Router();

    router.post('/', this.create);
    router.get('/', this.getAll);
    router.get('/:idTask', this.get);
    router.put('/:idTask', this.update);
    router.put('/change/:idTask', this.changeStatus);
    router.delete('/:idTask', this.delete);

    this.router = router;
  }

  async create(req: any, res: any) {
    try {
      const data = req.body.data;

      const section: any = await Section.findById(data.section)

      if (section) {
        const all_task: any = await Task.find({status: {$ne: 0}}).sort({order: -1});

        const new_task = new Task({...data, time: data.estimated, order: all_task[0].order + 1});
        const saved = await new_task.save();

        section.task_allowed.push(saved._id);

        await section.save();

        res.status(200).json(saved);
      } else {
        throw ("Error, No fue posible guardar la tarea.");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async changeStatus(req: any, res: any) {
    try {
      const data: any = req.body.data;
      const idTask: any = req.params.idTask;

      const task: any = await Task.findById(idTask);

      if (task) {
        task.time = data.time;
        task.status = data.status;

        const saved = await task.save();

        res.status(200).json(saved);
      } else {
        throw ("Error, No fue posible actualizar la tarea.");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async get(req: any, res: any) {
    try {

    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req: any, res: any) {
    try {
      const tasks: any = await Task.find({status: {$ne: 0}}).select('-deletedAt -createdAt -updatedAt -__v');

      res.status(200).json(tasks);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req: any, res: any) {
    try {
      const data: any = req.body.data;
      const idTask: any = req.params.idTask;

      const task: any = await Task.findById(idTask);

      if (task) {
        task.description = data.description;
        task.estimated = data.estimated;
        const saved = await task.save();

        res.status(200).json(saved);
      } else {
        throw ("Error, No fue posible actualizar la tarea.");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req: any, res: any) {
    try {
      const idTask: any = req.params.idTask;

      const task: any = await Task.findById(idTask);

      if (task) {
        task.status = 0;
        const saved = await task.save();

        res.status(200).json(saved);
      } else {
        throw ("Error, No fue posible actualizar la tarea.");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default TaskController;