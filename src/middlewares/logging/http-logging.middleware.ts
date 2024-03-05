import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const requestId = this.generateRequestId();
    this.logger.log(`[${requestId}] [${ip}] [${method}] ${url}`);
    response.on('close', () => {
      const { statusCode } = response;
      this.logger.log(
        `[${requestId}] [${ip}] [${method}] ${url} - ${statusCode} `,
      );
    });

    next();
  }

  private generateRequestId() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const second = currentDate.getSeconds().toString().padStart(2, '0');
    const millisecond = currentDate
      .getMilliseconds()
      .toString()
      .padStart(3, '0');
    const randomDigits = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    const requestId = `REST-${year}${month}${day}-${second}${millisecond}-${randomDigits}`;
    return requestId;
  }
}
