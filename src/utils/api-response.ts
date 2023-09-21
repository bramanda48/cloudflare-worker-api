export interface IResponseFormat<T = any> {
  statusCode: number;
  data?: T;
  errors?: IExceptionMessage[];
  metadata: IMetadataFormat;
}

export interface IMetadataFormat {
  request: IRequestMetadata;
  response: IResponseMetadata;
  pagination?: IPaginationMetadata;
}

export interface IRequestMetadata {
  timestamp: string;
  method: IRequestMethod;
  path: string;
  params?: object;
  query?: object;
  body?: object;
}

export interface IResponseMetadata {
  isArray: boolean;
  isPaginated: boolean;
  duration: string;
}

export interface IPaginationMetadata {
  limit: number;
  offset: number;
  nextUrl: string;
  prevUrl: string;
}

export interface IExceptionMessage {
  code: string;
  message: string;
  stack: string;
}

enum IRequestMethod {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  HEAD,
  OPTIONS,
  TRACE,
  CONNECT,
}
