import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class Postpipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value.title === 'string') return value;
    else
      throw new HttpException(
        'bad request only string required',
        HttpStatus.BAD_REQUEST,
      );
  }
}
