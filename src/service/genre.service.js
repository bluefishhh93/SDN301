import BaseService from "./base.service.js";
import Genre from "../Schema/genre.js";

class GenreService extends BaseService {
  constructor() {
    super(Genre);
  }
}

export default GenreService;