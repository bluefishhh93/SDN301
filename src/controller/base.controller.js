import BaseService from "../service/base.service.js";

class BaseController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res, next) {
    try {
      // Validate request body
      if (!req.body || Object.keys(req.body).length === 0) {
        console.log("Invalid request body");
        return res.status(400).json({ error: "Invalid request body" });
      }

      const entity = req.body;

      const savedEntity = await this.service.create(entity);

      if (!savedEntity) {
        // return res.status(400).json({ error: "Entity not created" });
        console.log("Entity not created");
        return next(new Error("Entity not created"));
      }

      console.log("Entity created successfully");
      return res.status(201).json(savedEntity);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedEntity = await this.service.updateById(id, data);
      if (!updatedEntity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      return res.status(200).json(updatedEntity);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const deletedEntity = await this.service.deleteById(id);
      if (!deletedEntity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      return res.status(200).json(deletedEntity);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const entities = await this.service.getAll();
      return res.status(200).json(entities);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const entity = await this.service.getById(id);
      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      return res.status(200).json(entity);
    } catch (error) {
      next(error);
    }
  }

  async paginate(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const keyword = req.query.keyword;
      const fieldName = req.query.fieldName;
      let result;
      if (keyword && fieldName) {
        result = await this.service.findAndPaginate(
          page,
          limit,
          keyword,
          fieldName
        );
      } else {
        result = await this.service.getAllAndPaginate(page, limit);
      }
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findAndPaginate(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const keyword = req.query.keyword;
      const fieldName = req.query.fieldName;
      const result = await this.service.findAndPaginate(
        page,
        limit,
        keyword,
        fieldName
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default BaseController;
