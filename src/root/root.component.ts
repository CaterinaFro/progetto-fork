import { Component, OnInit } from '@angular/core';
import {RicercaComponent} from './ricerca/ricerca.component';
import {InserimentoComponent} from './inserimento/inserimento.component';
import {CommonModule} from '@angular/common'
import { DbLibriService } from './db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from './libro';
import {Archivio} from './archivio';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  standalone: true,
  imports: [RicercaComponent, 
            CommonModule, 
            InserimentoComponent],
  providers: [DbLibriService],
})
export class RootComponent implements OnInit {
  view: string = 'home';
  sez: boolean = true;
  risultati!: Array<Libro>;
  
  constructor(private dbls: DbLibriService) { } //iniezione del servizio,
                                                //si instanzia un parametro da passare nel momento della costruzione .


  ngOnInit() {
  }

  ricerca() {
    this.view = 'ricerca';

    
  }

  inserimento() {
    this.view = 'inserimento';

  }

  CleanEvent(x:boolean) {
    this.view = 'home'; 
    this.sez = x; 
  }



  
 
}

