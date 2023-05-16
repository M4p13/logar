import chalk from 'chalk';

export interface LogStrategy {
    format(timestamp: string, identifier: string, message: string): string;
}

export class SimpleLogStrategy implements LogStrategy {
    format(timestamp: string, identifier: string, message: string): string {
        return `[${chalk.yellow(timestamp)}]@${chalk.gray(identifier)} - ${chalk.white(message)}`
    }
}

export class ErrorLogStrategy implements LogStrategy {
    format(timestamp: string, identifier: string, message: string): string {
        return `[${chalk.red(timestamp)}]@${chalk.gray(identifier)} - ${chalk.red(message)}`
    }
}