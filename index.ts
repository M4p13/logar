import chalk, { type ChalkInstance } from "chalk"

function getTimestamp(){
    return new Date().toISOString();
}

function append(baseString:string, ...args:any[]){
    return baseString + args.join(" ");
}

const chalks:{[key:string]:any} = {
  error:{
    timestamp: chalk.red,
    identifier: chalk.gray,
    message: chalk.red
  },
  log:{
    timestamp: chalk.yellow,
    identifier: chalk.gray,
    message: chalk.white
  },
}



function buildStringBuilder(type:string, identifier:string){
  if(!chalks[type]) throw new Error(`Invalid type: ${type}`)
  const chalk = chalks[type]
  return function(...args:any[]){
    const timestamp = getTimestamp()
    let logString = "";
    logString = append(logString, `[${chalk.timestamp(timestamp)}]`);
    logString = append(logString, `@${chalk.identifier(identifier)}`);
    logString = append(logString, " - ");
    logString = append(logString, chalk.message(...args));
    return logString;
  }
}


class Logger{
    identifier: string;
    logf: (...args: any[]) => string;
    errorf: (...args: any[]) => string;
    constructor(identifier:string){
        console.log('Initializing logger...');
        this.identifier = identifier;
        
        this.logf = buildStringBuilder("log", this.identifier)
        this.errorf = buildStringBuilder("error", this.identifier)
    }

    log(...args:any[]){
        console.log(this.logf(...args));
    }

    error(...args:any[]){
        console.error(this.errorf(...args));
    }

}

export {Logger}