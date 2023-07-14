export class Libro {
  titolo: string;
  autore: string;
  posizione: string;
  disponibile: boolean;

  constructor(titolo: string, autore: string, posizione: string, disponibile: boolean) {
    this.titolo = titolo;
    this.autore = autore;
    this.posizione = posizione;
    this.disponibile = disponibile;
  }
}