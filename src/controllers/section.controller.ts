import * as express from 'express';
import {Section, Task} from '../models';

class SectionController {

  public router: express.Router;

  constructor() {
    const router = express.Router();

    router.post('/', this.create);
    router.get('/', this.getAll);
    router.put('/:idSection', this.update);

    this.router = router;
  }

  async create(req: any, res: any) {
    try {
      const data: any = req.body.data;

      const new_section: any = new Section(data);
      const saved: any = await new_section.save();
      
      res.status(200).json(saved);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req: any, res: any) {
    try {
      const sections: any = await Section.find().select('-deletedAt -createdAt -updatedAt -__v');

      res.status(200).json(sections);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req: any, res: any) {
    try {
      const data: any = req.body.data;
      const idSection: any = req.params.idSection;

      const section: any = await Section.findById(idSection);

      if (section) {
        section.name = data.name;
        const saved = await section.save();

        res.status(200).json(saved);
      } else {
        throw ("Error, No fue posible actualizar la sección.");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default SectionController;