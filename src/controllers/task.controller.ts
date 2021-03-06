import * as express from 'express';
import {Section, Task} from '../models';

import {multiple_task} from "../constants/task";

class TaskController {

  public router: express.Router;

  constructor() {
    const router = express.Router();

    router.post('/', this.create);
    router.get('/', this.getAll);
    router.get('/:idTask', this.get);
    router.put('/:idTask', this.update);
    router.put('/change/:idTask', this.changeStatus);
    router.put('/reset/:idTask', this.reset);
    router.post('/order', this.order);
    router.post('/graph', this.graph);
    router.delete('/:idTask', this.delete);

    this.router = router;
  }

  async create(req: any, res: any) {
    try {
      const data = req.body.data;

      const section: any = await Section.findById(data.section)

      if (section) {
        const all_task: any = await Task.find({status: {$ne: 0}}).sort({order: -1});

        const new_task = new Task({
          ...data,
          time: data.estimated,
          order: all_task.length ? all_task[0].order + 1 : 1
        });

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

        if (data.status === 2) {
          task.finishedDate = new Date();
        }

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

  async reset(req: any, res: any) {
    try {
      const data: any = req.body.data;
      const idTask: any = req.params.idTask;

      const task: any = await Task.findById(idTask);

      if (task) {
        task.status = 1;
        task.time = task.estimated;
        const saved = await task.save();

        res.status(200).json(saved);
      } else {
        throw ("Error, No fue reiniciar.");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async order(req: any, res: any) {
    try {
      const data: any = req.body.data;

      for (const task of data.task) {
        const taskEdit: any = await Task.findById(task._id);

        if (taskEdit) {
          taskEdit.order = task.order;
          await taskEdit.save();
        }
      }

      res.status(200).json('Tareas actualizadas.');
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async graph(req: any, res: any) {
    try {
      for (const task of multiple_task) {
        const section: any = await Section.findById(task.section)

        if (section) {
          const all_task: any = await Task.find({status: {$ne: 0}}).sort({order: -1});

          const new_task = new Task({
            ...task,
            status: 2,
            order: all_task.length ? all_task[0].order + 1 : 1
          });

          const saved = await new_task.save();

          section.task_allowed.push(saved._id);

          await section.save();
        }
      }

      res.status(200).json('Tareas creadas.');
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