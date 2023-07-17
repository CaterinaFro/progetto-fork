import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../../libro';
import {Archivio} from '../../archivio';
import {CommonModule} from '@angular/common'
@Component({
  selector: 'app-presta',
  templateUrl: './presta.component.html',
  styleUrls: ['./presta.component.css'],
  standalone: true,
  providers: [DbLibriService],
  imports: [CommonModule]
})
export class PrestaComponent {
  //@Output() sezioneEvent = new EventEmitter<boolean>();
  @Input() libroTrovato: Libro = new Libro("", "", "", "");
  @Output() libroPrestatoEvent = new EventEmitter<boolean>();//x far comunicare presta-elimina

  messaggio : string = '';
  op_effettuata: boolean = false;

  constructor(private dbls: DbLibriService) { }

  presta() {
  // richiedo l'archivio vuoto
  this.dbls.getData().subscribe({
    next: (x: AjaxResponse<any>) => {
      //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON
      var libriPresenti = JSON.parse(x.response);

      var archivioAttuale: Archivio =  new Archivio(libriPresenti);
      // creo la libreria con l'elenco dei libri controllando tramite map la posizione del documento
      archivioAttuale.libri.map(
        (libro: Libro) => {
          if (libro.posizione == this.libroTrovato.posizione ){
          libro.stato= "libro prestato"}
          });

      //rimetto la libreria aggiornata
      this.dbls.setData(archivioAttuale.libri).subscribe({
        next: (x: AjaxResponse<any>) => {
          this.messaggio = 'libro prestato';
          this.op_effettuata = true;
          this.libroPrestatoEvent.emit(true);
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

  /*elimina(){
    // richiedo l'archivio vuoto
    this.dbls.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON
        var libriPresenti = JSON.parse(x.response);
        var archivioAttuale: Archivio =  new Archivio(libriPresenti);
        // creo la libreria con l'elenco dei libri controllando tramite filter tutti gli elementi che hanno posizione diversa da quella selezionata
        var nuova_lib = archivioAttuale.libri.filter(
          (libro: Libro) => libro.posizione != this.libroTrovato.posizione
        );

        //ricarico la nuova libreria tramite la SET
        this.dbls.setData(nuova_lib).subscribe({
          next: (x: AjaxResponse<any>) => {
            this.messaggio1 = 'libro eliminato';
            this.libroEliminato = true;
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

*/
