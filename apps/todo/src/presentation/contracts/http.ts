export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export type HttpRequest<T = any> = {
  data: T;
};

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: error.stack,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data,
});

export const create = (data: any): HttpResponse => ({
  statusCode: 201,
  data,
});
