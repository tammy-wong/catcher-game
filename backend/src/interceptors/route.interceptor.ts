import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable, catchError, tap } from "rxjs";

/**
 * Interceptor to report the time used by each endpoint with its controller.
 * This is only be triggered when the target controller is found.
 */
@Injectable()
export class RouteInterceptor implements NestInterceptor {
    private readonly logger = new Logger(RouteInterceptor.name)

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req: Request = context.switchToHttp().getRequest()
        const startTime = performance.now()
        return next
        .handle()
        .pipe(
            tap(() => this.logger.log(`(${req.method}) URI: ${req.originalUrl}, completed in ${Math.ceil(performance.now() - startTime)} ms`)),
            // catchError((err) => {
            //     this.logger.error(`URI: ${req.originalUrl}, error: ${err}`)
            //     return err
            // })
        )
    }

}