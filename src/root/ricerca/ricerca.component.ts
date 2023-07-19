import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../libro';
import {Archivio} from '../archivio';
import {CommonModule} from '@angular/common'
import {PrestaComponent} from './presta/presta.component';
import {RestituisciComponent} from './restituisci/restituisci.component';
//import {EliminaComponent} from './elimina/elimina.component';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  imports: [
    CommonModule, PrestaComponent, RestituisciComponent],
  standalone: true,
  providers: [DbLibriService]
})
export class RicercaComponent{
  @Output() sezioneEvent = new EventEmitter<boolean>();
  risultati : Array<Libro> = [];
  digitazione : string = "";
  libroTrovato: Libro = new Libro("", "", "", "");
  
constructor(private dbls: DbLibriService) { }

  clean() {
    this.sezioneEvent.emit(true);
  }


  ricercalibro() {
    var cerca: HTMLInputElement = document.getElementById('campo-ricerca') as HTMLInputElement;
    this.digitazione = cerca.value
    
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
      var libriPresenti = JSON.parse(x.response);
      var archivioAttuale: Archivio =  new Archivio(libriPresenti);
      this.risultati = archivioAttuale.libri.filter((libro: Libro) => (libro.titolo+libro.autore+libro.posizione).toLowerCase().includes(this.digitazione.toLocaleLowerCase()));
      if (this.risultati.length === 1) {
        this.libroTrovato = this.risultati[0];

      }

    },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))
  
  });
  }

}


