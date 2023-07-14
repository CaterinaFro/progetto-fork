import { Libro } from "./libro";

export class Archivio {
  libri: Array<Libro>;
  constructor(libri: Array<Libro>) {
    this.libri = libri;
  }

  inserimento(libro: Libro){
    this.libri.push(libro);
  }

  eliminazione(libro: Libro){
    this.libri = this.libri.filter((element) => element.posizione != libro.posizione);
  }

}