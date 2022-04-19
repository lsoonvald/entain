import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../../dto/login.dto';
import { RenewTokenDto } from '../../dto/renew-token.dto';
import { ReturnTokenDto } from '../../dto/return-token.dto';
import { Secret } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'user/services/user.service';
import { UserEntity } from 'user/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService) {}

    isAuthorized(token: string) {
        try {
            jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret);
        } catch (e) {
            return false;
        }
        return true;
    }

    async login(data: LoginDto) {
        const user = await this.userService.findByEmailUser(data.email);
        if (user && user.psw === data.password) {
            delete user.psw;
            const returnData: ReturnTokenDto = {
                refreshToken: jwt.sign(Object.assign({}, user), process.env.JWT_REFRESH_SECRET as Secret, { expiresIn: parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRE as string) }),
                accessToken: jwt.sign(Object.assign({}, user), process.env.JWT_ACCESS_SECRET as Secret, { expiresIn: parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRE as string) }),
            };
            return returnData;
        } else {
            throw new HttpException('Authentication failed.', HttpStatus.BAD_REQUEST);
        }
    }

    async renewToken(data: RenewTokenDto): Promise<ReturnTokenDto> {
        if (this.isAuthorized(data.refreshToken)) {
            const tokenContent: UserEntity = jwt.decode(data.refreshToken) as UserEntity;

            if (tokenContent.id) {
                const user = await this.userService.findByIdAllUsers(tokenContent.id);

                if (user) {
                    delete user.psw;

                    const returnData = {
                        refreshToken: jwt.sign(Object.assign({}, user), process.env.JWT_REFRESH_SECRET as Secret, { expiresIn: parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRE as string) }),
                        accessToken: jwt.sign(Object.assign({}, user), process.env.JWT_ACCESS_SECRET as Secret, { expiresIn: parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRE as string) }),
                    };

                    return returnData;
                }
            }
        } else {
            throw new HttpException('Token unauthorized.', HttpStatus.UNAUTHORIZED);
        }
        throw new HttpException('Token refresh failed.', HttpStatus.BAD_REQUEST);
    }
}
