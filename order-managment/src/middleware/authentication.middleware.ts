import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

type CallbackFunction = () => void;

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: CallbackFunction) {
    const authorizationHeader = req.get('Authorization');

    // Check if Auth header
    if (
      !authorizationHeader ||
      authorizationHeader.replace('Bearer ', '') !==
        this.configService.get('AUTH_TOKEN')
    ) {
      throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
