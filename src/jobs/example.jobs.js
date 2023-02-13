import { CronJob } from "cron";
import BaseJobs from "./base.job";

export default class ExampleJob extends BaseJobs {


    init() {
        this.name = 'BadgesJob';
        this.period = "* * * * * *"
    };

    async executeJob() {
        super.executeJob();
        //TODO: write the logic to execute to badges Job...!!
    }
}