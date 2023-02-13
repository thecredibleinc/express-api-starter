import { CronJob } from "cron";
import BaseJobs from "./base.job";

export default class DefaultJob extends BaseJobs {
    
    callBackFunction;

    constructor(argName,argPeriod,argFn){
        super()
        this.setData(argName,argPeriod,argFn);
    }

    setData(argName,argPeriod,argFn){
        this.name = argName;
        this.period = argPeriod;
        this.callBackFunction = argFn;
    }

    async executeJob(){
        if(this.callBackFunction){
            this.callBackFunction()
        }
    }
}