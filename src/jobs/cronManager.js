import { CronJob } from 'cron';
import BadgesJob from './example.jobs';
import BaseJob from './base.job';
import DefaultJob from './default.job';

export class CronManager {
    jobs=[];

     static instance =  null;

    constructor() {
        this.jobs = {};
    }
    static getInstance() {
        if (!CronManager.instance) {
            CronManager.instance = new CronManager();
        }
        return CronManager.instance;
    }

    // private getNewCronJob(periodText: any, fn: any) {
    //     return new CronJob(periodText, fn);
    // };

    // public addNewJob(name: any, periodText: any, fn: any) {
    //     const job: any = {};
    //     job[name] = new CronJob(periodText, fn, null, true);
    //     this.jobs.push(job);
    // };

     addNewJob(name, periodText, fn) {
        this.jobs[name] = new DefaultJob(name, periodText, fn);
    };

    /**
     * 
     * @param {BaseJob} argJob 
     */
     addJob(argJob) {
        if (!argJob) {
            throw Error("Pleae make sure that Job is initialized properly before passing it to the CronManager..");
        }
        if (!argJob.cronJob) {
            throw Error("Pleae make sure that Job is initialized properly before passing it to the CronManager..");
        }
        this.jobs[argJob.name] = argJob;
    };

     stopJob(name) {
        this.jobs[name].stop();
    }
    deleteJob(name) {
        delete this.jobs[name];
    }
    stopAll() {
        for (let name in this.jobs) {
            this.jobs[name].stop()
        }
    }
    listJobs() {
        return this.jobs;
    }
    getJob(name) {
        for (let name in this.jobs) {
            const activeJob = this.jobs[name];
            if (activeJob.name === name) {
                return activeJob;
            };
        };
    };
    startJob(name) {
        for (let name in this.jobs) {
            const activeJob = this.jobs[name];
            if (activeJob.name === name) {
                activeJob.cronJob.start();
            }
        }
    };
    startAll() {
        for (let name in this.jobs) {
            console.log("starting cron job "+name)
            this.jobs[name].start()
        }
    }
    runningJob(name) {
        return this.jobs[name].cronJob.running;
    }
    jobLastDate(name) {
        return this.jobs[name].cronJob.lastDate();
    }
    jobNextDates(name) {
        return this.jobs[name].cronJob.nextDates();
    }
}