import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../../libro';
import {Archivio} from '../../archivio';
import {CommonModule} from '@angular/common'
@Component({
  selector: 'app-presta_elimina',
  templateUrl: './presta_elimina.component.html',
  styleUrls: ['./presta_elimina.component.css'],
  standalone: true,
  providers: [DbLibriService],
  imports: [CommonModule]
})
export class Presta_eliminaComponent {
  // prendo dal component padre "ricerca" il libro selezionato
  @Input() libroTrovato: Libro = new Libro("", "", "", "");

  messaggio : string = '';
  op_effettuata: boolean = false;
  eliminato: boolean = false;
  prestato: boolean = false;
  nome: boolean = false;


  constructor(private dbls: DbLibriService) { }

  //metodo invocato al click di "Presta libro", permette di visualizzare l'input per inserire il nome del prestatario
  insert_nome() {
    this.nome = true;
  }

  //metodo invocato al click di "conferma",
  presta() {
    var nominativo: HTMLInputElement = document.getElementById('nominativo') as HTMLInputElement;;

  this.dbls.getData().subscribe({
    next: (x: AjaxResponse<any>) => {
      var libriPresenti = JSON.parse(x.response);
      var archivioAttuale: Archivio =  new Archivio(libriPresenti);
      // itero tramite map sui libri dell'archivio e quando trovo il libro che voglio prestare, cambio lo stato inserendo il prestatario
      archivioAttuale.libri.map(
        (libro: Libro) => {
          if (libro.posizione == this.libroTrovato.posizione ){
          libro.stato= "libro prestato a " + nominativo.value}
          });

      //invio l'archivio aggiornato e modifico variabili per cambiare visualizzazione
      this.dbls.setData(archivioAttuale.libri).subscribe({
        next: (x: AjaxResponse<any>) => {
          this.messaggio = 'libro prestato a ' + nominativo.value;
          this.op_effettuata = true;
          this.prestato =true;
          this.nome = false;
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

  elimina(){
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        var libriPresenti = JSON.parse(x.response);
        var archivioAttuale: Archivio =  new Archivio(libriPresenti);
        //si crea una nuova lib, lasciando attraverso filter tutti i libri tranne quello selezionato
        var nuova_lib = archivioAttuale.libri.filter(
          (libro: Libro) => libro.posizione != this.libroTrovato.posizione
        );

        //invio l'archivio aggiornato e modifico variabili per cambiare visualizzazione
        this.dbls.setData(nuova_lib).subscribe({
          next: (x: AjaxResponse<any>) => {
            this.messaggio = 'libro eliminato';
            this.op_effettuata = true;
            this.eliminato =true;
            this.nome = false;
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

