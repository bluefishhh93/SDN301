class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(entity) {
    try {
      const document = new this.model(entity);
      return await document.save();
    } catch (error) {
      throw new Error(`Error saving entity: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting entity: ${error.message}`);
    }
  }

  async updateById(id, data) {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Error updating entity: ${error.message}`);
    }
  }

  async findByKeyword(keyword, fieldName) {
    try {
      const query = {};
      query[fieldName] = new RegExp(keyword, "i");
      return await this.model.find(query);
    } catch (error) {
      throw new Error(`Error finding entities by keyword: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(`Error getting all entities: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      // console.log(id, "id")
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(`Error getting single entity: ${error.message}`);
    }
  }

  async getAllAndPaginate(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.model.find().skip(skip).limit(limit),
        this.model.countDocuments(),
      ]);

      return {
        data,
        page,
        limit,
        total,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Error getting paginated entities: ${error.message}`);
    }
  }

  async findAndPaginate(page, limit, keyword, fieldName) {
    try {
      const skip = (page - 1) * limit;
      const query = {};
      query[fieldName] = new RegExp(keyword, "i");
      const [data, total] = await Promise.all([
        this.model.find(query).skip(skip).limit(limit),
        this.model.countDocuments(query),
      ]);

      return {
        data,
        total,
        limit,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(
        `Error finding and paginating entities: ${error.message}`
      );
    }
  }
}

export default BaseService;
