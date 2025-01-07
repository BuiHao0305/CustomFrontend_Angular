// import { Injectable } from '@angular/core';
// import { enviroments } from '../enviroments/enviroment';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface OtpResponse {
//   otp: number;
//   countdowntime: number;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class OtpService {
//   private OtpUrl = `${enviroments.API_URL}/${enviroments.METHODS.OTP}`;

//   constructor(private http: HttpClient) {}

//   getOtp(): Observable<OtpResponse> {
//     return this.http.get<OtpResponse>(this.OtpUrl);
//   }
// }
