import { ErrorHandler, Injectable } from "@angular/core";
import axios from "axios";
import { AxiosInstance } from "axios";

export interface Params {
  [ key: string ]: any;
}

export interface GetOptions {
  url: string;
  params?: Params;
}

export interface ErrorResponse {
  id: string;
  code: string;
  message: string;
}

@Injectable()
/**
 * Repository to make API requests.
 */
export class ApiProvider {

  private client: AxiosInstance;
  private errorHandler: ErrorHandler;

  private baseUrl = 'http://localhost:3000/';


  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;

    this.client = axios.create({
      timeout: 3000,
      headers: {
        "X-Initialized-At": Date.now().toString()
      }
    })
  }

  public async get<T>(options: GetOptions) : Promise<T> {
    try {

      let axiosResponse = await this.client.request<T>({
        method: "get",
        url: this.baseUrl + options.url,
        params: options.params
      });

      return ( axiosResponse.data );

    } catch ( error ) {

      return( Promise.reject( this.normalizeError( error ) ) );

    }
  }

  private normalizeError( error: any ) : ErrorResponse {
    this.errorHandler.handleError( error );

    // NOTE: Since I'm not really dealing with a production API, this doesn't really
    // normalize anything (ie, this is not the focus of this demo).
    return({
      id: "-1",
      code: "UnknownError",
      message: "An unexpected error occurred."
    });

  }
}
