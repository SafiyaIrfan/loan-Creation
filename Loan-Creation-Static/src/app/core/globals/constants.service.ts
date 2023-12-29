import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public readonly MINLENGTH = 2;
  public readonly MAXLENGTH = 50;
  public readonly GROSSMAXLENGTH = 9;
  public readonly NETWTMAXLENGTH = 9
  public readonly RATEMAXLENGTH = 11;
  public readonly NUMBERMAXLENGTH = 15;
}
