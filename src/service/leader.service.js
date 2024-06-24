import BaseService from "./base.service.js";
import Leader from "../Schema/leader.js";

class LeaderService extends BaseService {
    constructor() {
        super(Leader);
    }
}

export default LeaderService;