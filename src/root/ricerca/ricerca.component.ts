import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../libro';
import {Archivio} from '../archivio';
import {CommonModule} from '@angular/common'
import {VisualizzazioneComponent} from './visualizzazione/visualizzazione.component';


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  imports: [
    CommonModule, VisualizzazioneComponent],
  standalone: true,
  providers: [DbLibriService]
})
export class RicercaComponent implements OnInit{
  @Output() sezioneEvent = new EventEmitter<boolean>();
  //@Output() libroEvent = new EventEmitter<Array<Libro>>();

  risultati : Array<Libro> = [];
  vuoto : string = "";
  digitazione : string = "";
  libroTrovato: Libro = new Libro("", "", "", true);
  risultato : boolean = false;

  
constructor(private dbls: DbLibriService) { }

  ngOnInit() {
  }

  clean() {
    this.sezioneEvent.emit(true);
  }


  ricercalibro() {
    // controllo che se l'input è vuoto l'elenco libri venga svuotato per non mostrarli 
    var cerca: HTMLInputElement = document.getElementById('campo-ricerca') as HTMLInputElement;
    this.digitazione = cerca.value
    if (this.digitazione == "") {
      this.risultati = [];
      return;}
    
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
      var libriPresenti = JSON.parse(x.response);
      var archivioAttuale: Archivio =  new Archivio(libriPresenti);
      this.risultati = archivioAttuale.libri.filter((libro: Libro) => (libro.titolo+libro.autore).toLowerCase().includes(this.digitazione.toLocaleLowerCase()));
      if (this.risultati.length === 1) {
        this.libroTrovato = this.risultati[0];
        this.risultato = true;

      }

    },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))
  
  });
  }

}


