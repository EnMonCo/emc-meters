import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import deepMapObject from './deep-map-object';
import meterResponseSerializer from '../meters/meter-response.serializer';
import { Meter } from '../meters/entities/meter.entity';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        return deepMapObject(data, (value) => {
          if (value.__entity === 'Meter') {
            meterResponseSerializer(value as Meter);
          }

          return value;
        });
      }),
    );
  }
}
