
import LeaderService from "../service/leader.service.js";
import BaseController from "./base.controller.js";

class LeaderController extends BaseController {
  constructor() {
    super(new LeaderService());
  }
}

export default LeaderController;
