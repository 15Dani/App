import { Enterprise } from './../_Models/Enterprise';
import { EnterpriseService } from './../_services/enterprise.service';
import {  OnInit, Component } from '@angular/core';
import { BsModalService, BsModalRef  } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component ({
  // tslint:disable-next-line: component-selector
  selector: 'app-Enterprise',
  templateUrl: './Enterprise.component.html',
  styleUrls: ['./Enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  enterprises: Enterprise[];
  enterprisefiltrados: Enterprise [];
  modalRef: BsModalRef;
  registerForm: FormGroup;
  enterprise: Enterprise;
  modoSalvar = 'post';

  bodyDeletarEvento = '';

  // tslint:disable-next-line: variable-name
  _filtroLista: string;

  constructor(
    private enterpriseService: EnterpriseService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localService: BsLocaleService,
    private toastr: ToastrService
    ) {
       this.localService.use('pt-br');
    }
    ngOnInit() {
    this.validation();
    this.getEnterprises();
  }

  get filtroLista(): string {
    return this._filtroLista;

  }
  set filtroLista(value: string) {
      this._filtroLista = value;
      this.enterprisefiltrados = this.filtroLista ? this.FiltrarEnterprise(this.filtroLista) : this.enterprises;
  }

  excluirenterprise(enterprise: Enterprise, template: any) {
    this.openModal(template);
    this.enterprise = enterprise;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Nome da empresa: ${enterprise.nome}, Código: ${enterprise.id}?`;
  }
  confirmeDelete(template: any) {
    this.enterpriseService.deleteEnterprise(this.enterprise.id).subscribe(
      () => {
        template.hide();
        this.getEnterprises();
        this.toastr.success('Deletado com Sucesso!');
      }, error => {
        this.toastr.error(' Erro ao tentar Deletar');
        console.log(error);
      }
    );
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  editarEnterprise(enterprise: Enterprise, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.enterprise = enterprise;
    this.registerForm.patchValue(enterprise);
  }

  novoEnterprise(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  FiltrarEnterprise(filtrarPor: string): Enterprise[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.enterprises.filter(
      enterprise => enterprise.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getEnterprises() {
    this.enterpriseService.getAllEnterprise().subscribe (
      // tslint:disable-next-line: variable-name
      (_enterprises: Enterprise[]) => {
      this.enterprises = _enterprises;
      this.enterprisefiltrados = this.enterprises;
      // tslint:disable-next-line: align
      }, error => {
         console.log(error);
      });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.enterprise = Object.assign({}, this.registerForm.value);
        this.enterpriseService.postEnterprise(this.enterprise).subscribe(
           (novoEnterprise: Enterprise ) => {
             console.log(novoEnterprise);
             template.hide();
             this.getEnterprises();
             this.toastr.success('Registrado salvo com Sucesso!');
           }, error => {
            this.toastr.error('Erro ao Registrar');
           }
          );
        } else {
          this.enterprise = Object.assign({id: this.enterprise.id}, this.registerForm.value);
          console.log(this.enterprise);
          this.enterpriseService.putEnterprise(this.enterprise).subscribe(
            ( ) => {
              template.hide();
              this.getEnterprises();
              this.toastr.success('Editado com Sucesso!');
            }, error => {
              this.toastr.error('Erro ao Editar');
              console.log(error);
            }
          );
        }
      }
    }
    validation() {
    this.registerForm = this.fb.group({
      nome: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      dataCadastro: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      inscricaoEstadual: ['', [Validators.required]],
      cnpj: ['', [Validators.required]]
    });
  }
}


