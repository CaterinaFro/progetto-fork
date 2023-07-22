import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../libro';
import {Archivio} from '../archivio';
import {CommonModule} from '@angular/common'
import {Presta_eliminaComponent} from './presta_elimina/presta_elimina.component';
import {RestituisciComponent} from './restituisci/restituisci.component';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  imports: [
    CommonModule, Presta_eliminaComponent, RestituisciComponent],
  standalone: true,
  providers: [DbLibriService]
})
export class RicercaComponent{
  @Output() sezioneEvent = new EventEmitter<string>();
  risultati : Array<Libro> = [];
  digitazione : string = "";
  libroTrovato: Libro = new Libro("", "", "", "");
  
constructor(private dbls: DbLibriService) { }

  //metodo che invoco con bottone "torna alla home" emette al componente root (genitore) la stringa "home"
  clean() {
    this.sezioneEvent.emit("home");
  }

  //metodo per la ricerca invocato al click del bottone "Ricerca libro";
  ricercalibro() {
    var cerca: HTMLInputElement = document.getElementById('campo-ricerca') as HTMLInputElement;
    //salvo nella stringa digitazione il contenuto del campo input
    this.digitazione = cerca.value
    
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
      var libriPresenti = JSON.parse(x.response);
      var archivioAttuale: Archivio =  new Archivio(libriPresenti);
      //salvo sull'array di libri "risultati" i libri che hanno corrispondenza con la digitazione
      this.risultati = archivioAttuale.libri.filter((libro: Libro) => (libro.titolo+libro.autore+libro.posizione).toLowerCase().includes(this.digitazione.toLocaleLowerCase()));
      //se si trova un libro, si memorizza nella variabile libroTrovato
      if (this.risultati.length === 1) {
        this.libroTrovato = this.risultati[0];

      }

    },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))
  
  });
  }

}


