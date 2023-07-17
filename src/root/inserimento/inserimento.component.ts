import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbLibriService } from '../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../libro';
import {Archivio} from '../archivio';
import {CommonModule} from '@angular/common'


@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],
  imports: [CommonModule],
  standalone: true,
  providers: [DbLibriService]
})
export class InserimentoComponent {
  @Output() sezioneEvent = new EventEmitter<boolean>();
  //@Output() nuovoLibroEvent = new EventEmitter<Libro>(); //??
  messaggio : string = '';
  inserito : boolean = true;

  constructor(private dbls: DbLibriService) { } 

  clean() {
    this.sezioneEvent.emit(true);
  }

  //metodo per l'inserimento invocato al click del bottone "Inserisci";
  inserisci () {
    var titolo: HTMLInputElement = document.getElementById('titolo') as HTMLInputElement;
    var autore: HTMLInputElement = document.getElementById('autore') as HTMLInputElement;
    var posizione: HTMLInputElement = document.getElementById('posizione') as HTMLInputElement;
    var stato: string = "libro disponibile";

    var nuovoLibro : Libro = new Libro(titolo.value, autore.value, posizione.value, stato)
    
    // richiedo l'archivio 
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        //array di documenti scaricato => stringa di tipo JSON 
        var libriPresenti  = JSON.parse(x.response) || [];    //PERCHEEEEEEE
        // nuovo archivio con libri = libri presenti
        var archivioAttuale: Archivio =  new Archivio(libriPresenti);
        //archivioAttuale.libri.push(nuovoLibro)
        archivioAttuale.inserimento(nuovoLibro)
        //errore: string = "";
        //library.adapt(booklist);
        //controllo che all'interno della libreria non ci sia già un libro a quella posizione
        //if (library.libri.some((el) => el.posizione == posizione.value)){
        //  this.errore = "Questa posizione è già occupata da un altro libro";
        //} else {
        //this.errorMsg = "";
        this.dbls.setData(archivioAttuale.libri).subscribe({
        next: (x: AjaxResponse<any>) => {
          this.inserito = false;
          this.messaggio = 'libro inserito';
          
          return;
        },
        error: (err) =>
          console.error('La richiesta ha generato un errore: ' + JSON.stringify(err))
  
        })
    },
      error: (err) =>
        console.error('La richiesta ha generato un errore: ' + JSON.stringify(err))
      });
  

      titolo.value = "";
      autore.value = "";
      posizione.value = "";

    }
}


//METTERE CONDIZIONI X NON LASCIARE CAMPI VUOTI
//METTERE CONTROLLO SU POSIZIONE CHE DEVE ESSERE UNIVOCA