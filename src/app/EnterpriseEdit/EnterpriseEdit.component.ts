import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Enterprise } from '../_Models/Enterprise';
import { EnterpriseService } from '../_services/enterprise.service';
import { BsModalService, BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-EnterpriseEdit',
  templateUrl: './EnterpriseEdit.component.html',
  styleUrls: ['./EnterpriseEdit.component.css']
})
export class EnterpriseEditComponent implements OnInit {

  titulo   = 'Editar Enterprise';
  registerForm: FormGroup;
  // tslint:disable-next-line: new-parens
  enterprise: Enterprise = new Enterprise;
  fileNameToUpdate: string;
  dataAtual       = '';
  modoSalvar: string;


  constructor(
    private enterpriseService: EnterpriseService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private localService: BsLocaleService,
    private toastr: ToastrService
  ) {
     this.localService.use('pt-br');
  }

  ngOnInit() {
    this.validation();
    this.carregarEnterprise();

  }
  salvarEnterprise(template: any) {
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
  getEnterprises() {
    throw new Error('Method not implemented.');
  }
  carregarEnterprise() {
     const idEnterprise = + this.router.snapshot.paramMap.get('id');
     this.enterpriseService.getEnterpriseById(idEnterprise)
    .subscribe(
       (enterprise: Enterprise) => {
         this.enterprise = Object.assign({}, enterprise);
       }
    );
}
  validation() {
    this.registerForm = this.fb.group({
      id: [],
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
