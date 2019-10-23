import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Enterprise',
  templateUrl: './Enterprise.component.html',
  styleUrls: ['./Enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  _filtroLista: string;

  get filtroLista(): string {
    return this._filtroLista;

  }
  set filtroLista(value: string) {
      this._filtroLista = value;
      this.enterprisefiltrados = this.filtroLista ? this.FiltrarEnterprise(this.filtroLista) : this.enterprises;
  }

   enterprisefiltrados: any = [];
   enterprises: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEnterprises();
  }

  FiltrarEnterprise(filtrarPor: string): any[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.enterprises.filter(
      enterprise => enterprise.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getEnterprises() {
    this.enterprises = this.http.get('http://localhost:5000/api/enterprise').subscribe(
      response => {this.enterprises = response;
      }, error => {
         console.log(error);
      }
    );
  }

}
