//Módulo 4 deverá acrescentar duas novas funcionalidades ao nosso projeto
// Exibir a data do último acesso do usuário (cookies) cookies = biscoitos
// Autenticar o usuário para controlar o acesso aos recursos da aplicação (sessão)

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host = 'localhost';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    // extrair os dados do corpo da requisição, além de validar os dados
    const dados = requisicao.body;
    let conteudoResposta = '';
    //é necessário validar os dados enviados
    //A validação dos dados é de responsabilidade da aplicação servidora
    if (!(dados.nome && dados.sobrenome && dados.nomeUsuario
        && dados.cidade && dados.uf && dados.cep)) {
        //estão faltando dados do usuário!
        conteudoResposta = `
        <!doctype html>
        <html lang="pt-br">
        
        <head>
          <title>Cadastro de Eventos</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
          <link rel="stylesheet" href="style.css">
          <script src="MascarasValidaCPF.js"></script>
        </head>
        
        <body>
          <header>
          </header>
          <main class="background">
            <div class="container mt-4 col-8">
              <h1>Cadastro De Alunos em Eventos Universitários</h1>
              <form action='/cadastrarUsuario' method='POST' class="row g-3 needs-validation mt-4" novalidate>
                <div class="col-md-2">
                  <label for="nome" class="form-label">RA</label>
                  <input type="text" class="form-control" id="ra" name="ra"  value="${dados.ra}" required>
                </div>
                `;
                if (!dados.ra) {
                conteudoResposta += `<div>
                  <p class="text-danger">O campo R.A é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-4">
                  <label for="nome" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required>
                </div>
                `;
                if (!dados.nome) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Nome é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-6">
                  <label for="sobrenome" class="form-label">Sobrenome</label>
                  <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="${dados.sobrenome}" required>
                </div>
                `;
                if (!dados.sobrenome) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Sobrenome é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-6">
                  <label for="cidade" class="form-label">Cidade</label>
                  <input type="text" class="form-control" id="cidade" name="cidade" value="${dados.cidade}" required>
                </div>
                `;
                if (!dados.cidade) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Cidade é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-3">
                  <label for="estado" class="form-label">UF</label>
                  <select class="form-select" id="estado" name="estado" value="${dados.estado}" required>
                    <option selected disabled value="">Escolha</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    <option value="EX">Estrangeiro</option>
                  </select>
                </div>
                `;
                if (!dados.estado) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo UF é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-3">
                  <label for="cep" class="form-label">CEP</label>
                  <input type="text" class="form-control" id="cep" name="cep"  value="${dados.cep}" required>
                </div>
                `;
                if (!dados.cep) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo CEP é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-3">
                  <label for="telefone" class="form-label">Telefone</label>
                  <input type="text" class="form-control" id="telefone" name="telefone" value="${dados.telefone}" required>
                </div>
                `;
                if (!dados.telefone) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Telefone é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-6">
                  <label for="email" class="form-label">Email</label>
                  <input type="text" class="form-control" id="email" name="email" value="${dados.email}" required>
                </div>
                `;
                if (!dados.email) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Email é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-6">
                  <label for="evento" class="form-label">Evento</label>
                  <input type="text" class="form-control" id="evento" name="evento" value="${dados.evento}" required>
                </div>
                `;
                if (!dados.evento) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Evento é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-3">
                  <label for="dataInicio" class="form-label">Data Inicio</label>
                  <input type="date" class="form-control" id="dataInicio" name="dataInicio" value="${dados.dataInicio}" required>
                </div>
                `;
                if (!dados.dataInicio) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Data Inicio é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-3">
                  <label for="horaInicio" class="form-label">Hora</label>
                  <input type="time" class="form-control" id="horaInicio" name="horaInicio" value="${dados.horaInicio}" required>
                </div>`;
                if (!dados.horaInicio) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Hora é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-3">
                  <label for="dataFim" class="form-label">Data Fim</label>
                  <input type="date" class="form-control" id="dataFim" name="dataFim" value="${dados.dataFim}" required>
                </div>
                `;
                if (!dados.dataFim) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Data Fim é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-md-3">
                  <label for="horaFim" class="form-label">Hora</label>
                  <input type="time" class="form-control" id="horaFim" name="horaFim" value="${dados.horaFim}" required>
                </div>
                `;
                if (!dados.horaFim) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Hora Fim é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" name="inavalidCheck" value="${dados.inavalidCheck}" required>
                    <label class="form-check-label" for="invalidCheck">
                      Concordo com os termos e condições.
                    </label>
                  </div>
                </div>
                `;
                if (!dados.inavalidCheck) {
                conteudoResposta += `
                <div>
                  <p class="text-danger">O campo Concordo com os termos e condições é obrigatório</p>
                </div>`;
                }
                conteudoResposta += `
                <div class="col-12">
                  <button class="btn btn-primary col-12" type="submit">Cadastrar</button>
                </div>
              </form>
            </div>
          </main>
          <footer>
          </footer>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
            integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
            </script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
            integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
            </script>
        </body>
        
        </html>`;
        resposta.end(conteudoResposta);
    }//fim do if/else 
}

//pseudo middleware
function autenticar(requisicao, resposta, next){
    if (requisicao.session.usuarioAutenticado){
        next();
    }
    else{
        resposta.redirect("/login.html");
    }
}
const app = express();
//ativando a funcionalidade de manipular cookies
app.use(cookieParser());

//adicionar uma nova capacidade para essa aplicação: Memorizar com quem o servidor está falando
//durante o uso do sistema, a aplicação saberá, dentro de uma sessão válida, com quem ela se comunica.
app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave: true, //atualiza a sessão mesmo que não há alterações a cada requisição
    saveUninitialized: true,
    cookie: {
        //tempo de vida da sessão
        maxAge: 1000 * 60 * 15 //15 minutos
    }
}));


//ativar a extensão que manipula requisisões HTTP
//opção false ativa a extensão querystring
//opção true ativa a extensão qs (manipula objetos (lista, aninhados))
app.use(express.urlencoded({ extended: true }));

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static(path.join(process.cwd(), 'paginas')));

app.get('/',autenticar, (requisicao, resposta) => {
    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });
    resposta.end(`
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <title>Menu do sistema</title>
            </head>
            <body>
                <h1>MENU</h1>
                <ul>
                    <li><a href="/cadastraUsuario.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
            <footer>
                <p>Seu último acesso foi em ${dataUltimoAcesso}</p>
            </footer>
        </html>
    `);
})

//endopoint login que irá processar o login da aplicação
app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario && senha && (usuario === 'renato') && (senha === '123')){
        requisicao.session.usuarioAutenticado = true;
        resposta.redirect('/');
    }
    else{
        resposta.end(`
            <!DOCTYPE html>
                <head>
                    <meta charset="UTF-8">
                    <title>Falha na autenticação</title>
                </head>
                <body>
                    <h3>Usuário ou senha inválidos!</h3>
                    <a href="/login.html">Voltar ao login</a>
                </body>
            </html>
        `);
    }
});

//rota para processar o cadastro de usuários endpoint = '/cadastrarUsuario'
app.post('/cadastrarUsuario',autenticar, processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});


