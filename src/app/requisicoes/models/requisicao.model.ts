import { Departamento } from "src/app/departamentos/models/departamento.model";
import { Funcionario } from "src/app/funcionarios/models/funcionario.model";
import { Equipamento } from "src/app/equipamentos/models/equipamento.model";


export class Requisicao {
  id: string;
  descricao: string;
  dataAbertura: any;
  departamentoId: string;
  departamento?: Departamento;
  funcionarioId:string;
  funcionario?:Funcionario;
  equipamentoId:string;
  equipamento?:Equipamento;
}
