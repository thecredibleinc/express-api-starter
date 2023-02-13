import { CronJob } from 'cron';

export default class BaseJob  {
    
    name="";
    period;
    cronJob;

    constructor() {
        this.startInitialisation();
    };
    
    startInitialisation(){
        this.init()
        this.initializeCronJob();
    }

    init(){
        
    };

    initializeCronJob(){
        this.cronJob = new CronJob(this.period,this.handle.bind(this))
    };
    
    async handle() {
        console.log("/////////////////////////////////")
        console.log("starting execution JOB:"+this.name)
        console.log("---------------------------------")
        await this.executeJob();
        console.log("---------------------------------")
        console.log("stoping execution JOB:"+this.name)
        console.log("/////////////////////////////////")
    };

    async executeJob(){
        console.log("executing:"+this.name)
    }

    start() {
        // Start job
        if(!this.cronJob){
            return;
        }
        if (!this.cronJob.running) {
            this.cronJob.start();
        }
    }

    stop() {
        // Start job
        if(!this.cronJob){
            return;
        }
        if (this.cronJob.running) {
            this.cronJob.stop();
        }
    }
}