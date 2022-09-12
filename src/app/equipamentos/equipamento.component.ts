import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Equipamento } from './models/equipamento.model';
import { EquipamentoService } from './services/equipamento.service';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
})
export class EquipamentoComponent implements OnInit {
  public equipamentos$: Observable<Equipamento[]>;
  public form: FormGroup;
  public dataMax: string;

  constructor(
    private equipamentoService: EquipamentoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.equipamentos$ = this.equipamentoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(''),
      nome: new FormControl(''),
      preco: new FormControl(''),
      dataFab: new FormControl(''),

    });

    this.dataMax = new Date().toISOString().slice(0,10)

  }

  get tituloModal(): string {
    return this.id?.value ? 'Atualização' : 'Cadastro';
  }

  get id() {
    return this.form.get('id');
  }

  get nome() {
    return this.form.get('nome');
  }

  get preco() {
    return this.form.get('preco');
  }

  get dataFab() {
    return this.form.get('dataFab');
  }

  public async gravar(modal: TemplateRef<any>, equipamento?: Equipamento) {
    this.form.reset();

    if (equipamento) this.form.setValue(equipamento);

    try {
      await this.modalService.open(modal).result;

      if (!equipamento) await this.equipamentoService.inserir(this.form.value);
      else await this.equipamentoService.editar(this.form.value);

      this.toastrService.success("O equipamento foi salvo com sucesso", "Cadastro de Equipamentos");
    } catch (error) {
      if (error != "fechar" && error != "0" && error != "1")
      this.toastrService.error("Houve um erro ao salvar o equipamento. Tente novamente.", "Cadastro de Equipamentos")
    }
  }

  public async excluir(equipamento: Equipamento) {
    try{
      await this.equipamentoService.excluir(equipamento);

      this.toastrService.success(`O equipamento foi excluído com sucesso`, "Cadastro de Equipamentos");
    }
      catch (error) {
      this.toastrService.error("Houve um erro ao salvar o equipamento. Tente novamente.", "Cadastro de equipamentos")
      }
  }
}
