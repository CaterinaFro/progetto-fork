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
  messaggio : string = '';
  messaggio1 : string = '';
  inserito : boolean = true;
  svuota: boolean = false;

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
        var libriPresenti  = JSON.parse(x.response);
        // nuovo archivio con libri scaricati
        var archivioAttuale: Archivio =  new Archivio(libriPresenti);
        //inserisco nuovo libro nell'archivio
        archivioAttuale.inserimento(nuovoLibro)
        //ricarico l'archivio aggiornato
        this.dbls.setData(archivioAttuale.libri).subscribe({
        next: (x: AjaxResponse<any>) => {
          this.inserito = false;
          this.messaggio = 'libro inserito!';
          setInterval (() => {
            this.messaggio = ''
            },2000)
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

  
  svuotaArchivio() {
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        const libriPresenti = JSON.parse(x.response);
        const ArchivioVuoto = new Archivio([]); // Create a new empty archivio
  
      this.dbls.setData(ArchivioVuoto.libri).subscribe({
        next: () => {
          this.messaggio1 = 'Archivio svuotato con successo';
          this.svuota = true;
        },
        error: (err) => {
          console.error('La richiesta ha generato un errore: ' + JSON.stringify(err));
        }
    });
  },
      error: (err) => {
          console.error('La richiesta ha generato un errore: ' + JSON.stringify(err));
        }
      });
    }
}

