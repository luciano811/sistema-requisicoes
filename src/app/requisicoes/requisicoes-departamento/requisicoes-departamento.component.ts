import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAuth } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Departamento } from 'src/app/departamentos/models/departamento.model';
import { DepartamentoService } from 'src/app/departamentos/services/departamento.service';
import { Equipamento } from 'src/app/equipamentos/models/equipamento.model';
import { EquipamentoService } from 'src/app/equipamentos/services/equipamento.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario.model';
import { FuncionarioService } from 'src/app/funcionarios/service/funcionario.service';
import { Requisicao } from '../models/requisicao.model';
import { RequisicaoService } from '../services/requisicao.service';

@Component({
  selector: 'app-requisicoes-departamento',
  templateUrl: './requisicoes-departamento.component.html',
})
export class RequisicoesDepartamentoComponent implements OnInit {
  public requisicoes$: Observable<Requisicao[]>;
  public requisicoesDep$: Observable<Requisicao[]>;
  public funcionarios$: Observable<Funcionario[]>;
  public departamentos$: Observable<Departamento[]>;
  public equipamentos$: Observable<Equipamento[]>;
  public ArrayReqs:Requisicao[];

  private processoAutenticado$: Subscription;

  funcionarioLogadoId: string;
  departamentoFuncionarioLogadoId: string;
  public form: FormGroup;

  constructor(
    private toastrService: ToastrService,
    private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private funcionarioService: FuncionarioService,
    private authService: AuthenticationService,
    private equipamentoService: EquipamentoService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      dataAbertura: new FormControl(''),
      descricao: new FormControl('', [Validators.required]),
      departamentoId: new FormControl('', [Validators.required]),
      departamento: new FormControl(''),
      equipamentoId: new FormControl('', [Validators.required]),
      equipamento: new FormControl(''),
      funcionarioId: new FormControl(''),
      funcionario: new FormControl(''),
    });

    this.departamentos$ = this.departamentoService.selecionarTodos();
    this.equipamentos$ = this.equipamentoService.selecionarTodos();
    //this.requisicoes$ = this.requisicaoService.selecionarTodos();

    this.processoAutenticado$ = this.authService.usuarioLogado.subscribe(usuario => {
      const email: string = usuario?.email!;

      this.funcionarioService.selecionarFuncionarioLogado(email)
        .subscribe(funcionario => {
          this.departamentoFuncionarioLogadoId = funcionario.departamentoId
          this.requisicoes$ = this.requisicaoService.selecionarRequisicoesDepartamentoAtual(this.departamentoFuncionarioLogadoId);
        })
    })


  }

  ngOnDestroy(): void {
    this.processoAutenticado$.unsubscribe();
  }



  get tituloModal(): string {
    return this.id?.value ? 'Atualização' : 'Cadastro';
  }

  get id(): AbstractControl | null {
    return this.form.get('id');
  }

  get dataAbertura(): AbstractControl | null {
    return this.form.get('dataAbertura');
  }

  get descricao(): AbstractControl | null {
    return this.form.get('descricao');
  }

  get funcionarioId(): AbstractControl | null {
    return this.form.get('funcionarioId');
  }

  get funcionario() {
    return this.form.get("funcionario");
  }

  get departamentoId(): AbstractControl | null {
    return this.form.get('departamentoId');
  }

  get equipamentoId(): AbstractControl | null {
    return this.form.get('equipamentoId');
  }

  get departamentoBotao(): AbstractControl | null {
    return this.form.get('equipamentoId');
  }

  public visualizar() {

  }

  public movimentar() {

  }
}
