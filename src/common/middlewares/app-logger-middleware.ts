import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const ua = req.get('user-agent') || '';
    const ip = req.ip;

    this.logger.log(`> ${req.method} ${req.originalUrl} - ${ua} ${ip}`);

    res.on('finish', () => {
      const dur = Date.now() - start;
      const len = res.get('content-length') ?? '0';
      this.logger.log(
        `< ${req.method} ${req.originalUrl} ${res.statusCode} ${len} ${dur}ms`,
      );
    });

    next();
  }
}
