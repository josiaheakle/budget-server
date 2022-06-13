export interface ServerResponse {
  isValid: boolean;
  message: string;
  data?: {
    [index: string]: any;
  };
}
