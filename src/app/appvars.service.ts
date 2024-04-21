import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppvarsService {
  server = 'http://delima.padinet.com:2018'
  serverx = 'http://127.0.0.1:2018'
  constructor() { }
}
