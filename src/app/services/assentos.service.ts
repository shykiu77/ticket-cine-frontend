import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssentosService {
  getAssentos() {
    const assentos = Array.from({ length: 20 }, (_, i) => ({
      numero: i + 1,
      ocupado: Math.random() < 0.2,
    }));
    return assentos;
  }
}
