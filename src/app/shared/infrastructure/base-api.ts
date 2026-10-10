import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseApi {
  private baseUrl = 'https://motus-backend.onrender.com';

  constructor(private http: HttpClient) {}

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getHttpClient(): HttpClient {
    return this.http;
  }
}
