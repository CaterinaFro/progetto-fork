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
  //@Output() sezioneEvent = new EventEmitter<boolean>();
  @Input() libroTrovato: Libro = new Libro("", "", "", "");
  messaggio : string = '';
  prestato: boolean = true; 
  
  constructor(private dbls: DbLibriService) { }

  restituisci () {
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON
        var libriPresenti = JSON.parse(x.response);
  
        var archivioAttuale: Archivio =  new Archivio(libriPresenti);
        archivioAttuale.libri.map(
          (libro) => {
            if (libro.posizione == this.libroTrovato.posizione ){
            libro.stato = 'libro disponibile'}
            });
//rimetto la libreria aggiornata
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
