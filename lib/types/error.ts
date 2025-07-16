// lib/types/error.ts
export interface ErrorData {
    message?: string;
    non_field_errors?: string[];
    [key: string]: unknown;
  }
  
  export interface AxiosErrorResponse {
    response?: {
      data?: ErrorData;
      status?: number;
    };
  }
  