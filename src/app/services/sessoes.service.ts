import { Injectable } from '@angular/core';

interface Session {
  room: number;
  times: string[];
}

interface MovieData {
  description: string;
  sessions: { [key: string]: Session[] };
}

@Injectable({
  providedIn: 'root',
})
export class SessoesService {
  private mockSessionData: { [key: string]: Session[] } = Array.from(
    { length: 7 },
    (_, i) => {
      const date = new Date(Date.now() + i * 86400000)
        .toISOString()
        .split('T')[0];

      const generateRandomTimes = (): string[] => {
        const numTimes = Math.floor(Math.random() * 4) + 2;
        const times: string[] = [];
        let startHour = 12;
        for (let j = 0; j < numTimes; j++) {
          const hour = startHour + Math.floor(Math.random() * 5);
          const minute = Math.random() < 0.5 ? '00' : '30';
          times.push(`${hour.toString().padStart(2, '0')}:${minute}`);
          startHour = hour + 1;
        }
        return times;
      };

      const numRooms = Math.floor(Math.random() * 3) + 1;

      return {
        [date]: Array.from({ length: numRooms }, (_, roomIndex) => ({
          room: roomIndex + 1,
          times: generateRandomTimes(),
        })),
      };
    }
  ).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  private movieDescriptions: { [key: string]: string } = {
    '1': `Sequência do indicado ao Oscar, O Pai (2020). Florian Zeller traz às telas
    O Filho, longa-metragem que conta a história de Peter (Hugh Jackman), cuja
    vida agitada com a nova companheira é interrompida quando a ex-mulher Kate
    (Laura Dern) chega com o filho adolescente problemático e distante,
    Nicholas (Zen McGrath), deixando a família em caos. Embora Peter mal
    conheça Nicholas, ele decide se dar uma chance e concorda em hospedá-lo. O
    próprio Peter tem uma relação terrível com o pai, que era cruel quando
    ainda estava em sua vida. Tudo parece indicar que o homem superou o trauma
    da infância e espera ser um bom pai para Nicholas.`,
  };

  constructor() {}

  getMovieData(movieId: string): MovieData {
    return {
      description:
        this.movieDescriptions[movieId] || 'Descrição não disponível',
      sessions: this.mockSessionData,
    };
  }

  getAvailableDates(): string[] {
    return Object.keys(this.mockSessionData);
  }
}
