
export interface ServerError {
    response: {
      data: {
        data: {
            message: string;
        }
      };
    };
    status: number;
    code: string;
}
  