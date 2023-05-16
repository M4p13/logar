import { SimpleLogStrategy, ErrorLogStrategy, LogStrategy } from "./Strategies";

const strategies = {
    simple: new SimpleLogStrategy(),
    error: new ErrorLogStrategy()
}

function getTimestamp():string{
    return new Date().toISOString();
}

export class Logger{
    private identifier:string;
    private strategy:LogStrategy;
    constructor(identifier:string){
        this.identifier = identifier;
        this.strategy = new SimpleLogStrategy();
    }

    private _setStrategy(strategy:LogStrategy):void{
        this.strategy = strategy;
    }

    private _log(...args:any[]):void{
        const message = args.join(' ');
        const timestamp = getTimestamp();
        const formattedMessage = this.strategy.format(timestamp, this.identifier, message);
        console.log(formattedMessage);
    }

    log(...args:any[]):void{
        this._setStrategy(strategies.simple);
        this._log(...args);
    }

    error(...args:any[]):void{
        this._setStrategy(strategies.error);
        this._log(...args);
    }
}