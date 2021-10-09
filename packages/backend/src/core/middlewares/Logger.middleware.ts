import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { green, blue } from 'chalk';

// default std
const log = console.log;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: () => void) {
    const {} = req;
    log(green('Start middleware logs'));
    log(green(JSON.stringify(req.params, null, 3)));
    log(blue('method --> ' + req.method));
    log(green('body'));
    log(blue(JSON.stringify(req.body, null, 3)));
    log(green('End middleware logs'));

    next();
  }
}
