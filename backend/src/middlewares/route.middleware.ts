import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RouteMiddleware implements NestMiddleware {
    private readonly logger = new Logger(RouteMiddleware.name)

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`(${req.method}) URI: ${req.originalUrl}`)
        next()
    }
}