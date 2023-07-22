import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../../libro';
import {Archivio} from '../../archivio';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-restituisci',
  templateUrl: './restituisci.component.html',
  styleUrls: ['./restituisci.component.css'],
  standalone: true,
  providers: [DbLibriService],
  imports: [CommonModule]
})
export class RestituisciComponent{
  // prendo dal component padre "ricerca" il libro selezionato
  @Input() libroTrovato: Libro = new Libro("", "", "", "");
  messaggio : string = '';
  prestato: boolean = true; 
  
  constructor(private dbls: DbLibriService) { }

  //metodo invocato al click di "restituisci libro"
  restituisci () {
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON
        var libriPresenti = JSON.parse(x.response);
        var archivioAttuale: Archivio =  new Archivio(libriPresenti);
        // itero tramite map sui libri dell'archivio e quando trovo il libro che voglio restituire, cambio lo stato
        archivioAttuale.libri.map(
          (libro:Libro) => {
            if (libro.posizione == this.libroTrovato.posizione ){
            libro.stato = 'libro disponibile'}
            });
        //invio l'archivio aggiornato e modifico variabili per cambiare visualizzazione
        this.dbls.setData(archivioAttuale.libri).subscribe({
          next: (x: AjaxResponse<any>) => {
            this.messaggio = 'libro restituito';
            this.prestato = false;
          return;
          },
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
          });
      
        },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
  });
  }

}
