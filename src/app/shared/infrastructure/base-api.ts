import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseApi {
  private baseUrl = environment.platformProviderApiBaseUrl;

  constructor(private http: HttpClient) {}

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getHttpClient(): HttpClient {
    return this.http;
  }
}
