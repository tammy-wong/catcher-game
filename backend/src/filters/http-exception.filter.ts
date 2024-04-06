import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

/**
 * Filter to report the traffic dropped, e.g., target controller cannot be found.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name)

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const rsp = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();
        this.logger.error(`(${req.method}) URI: ${req.originalUrl}, ${exception.stack}`)
        rsp.status(status).json(exception.getResponse())
    }
}