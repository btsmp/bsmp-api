import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('LoggerMiddleware');
    const endpoint = req.baseUrl;
    const method = req.method;

    logger.log(`New Request => ${endpoint} | Method: ${method}`);
    next();
  }
}
