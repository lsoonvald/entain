import { NestMiddleware, Injectable, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import { UserService } from 'user/services/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, next: NextFunction) {
    if (!req.headers.authorization) throw new UnauthorizedException('Missing authentication header');

    const token = req.headers.authorization.split(' ')[1];

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret);
    } catch (error) {
      throw new UnauthorizedException('INVALID_TOKEN');
    }

    const user = await this.userService.findByIdAllUsers(decoded.id);
    if (!user) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }

    next();
  }
}
