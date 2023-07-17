export class Libro {
  titolo: string;
  autore: string;
  posizione: string;
  stato: string;

  constructor(titolo: string, autore: string, posizione: string, stato: string) {
    this.titolo = titolo;
    this.autore = autore;
    this.posizione = posizione;
    this.stato = stato;
  }
}