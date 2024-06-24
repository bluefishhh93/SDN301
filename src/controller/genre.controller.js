import BaseController from "./base.controller.js";
import GenreService from "../service/genre.service.js";

class GenreController extends BaseController {
  constructor() {
    super(new GenreService());
  }
}

export default GenreController;
