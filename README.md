# Adota.ai

## Background
* O presente repositório possui o código-fonte bem como a documentação do último projeto da disciplina de Engenharia de Software (IF-977) ministrada pelo professor Vinicius Garcia, do CIn/UFPE.


## Objetivo
* O objetivo do projeto é construir uma aplicação (no formato MVC), que seja capaz de solucionar ou mitigar um problema que esteja presente no mundo real.
* Como tema escolhido, nosso grupo optou pelo abandono e adoção de animais de estimação (com foco em cães e gatos).
* Nossa aplicação se chama "Adota.ai" e almeja ser uma plataforma capaz de facilitar a divulgação de animais de estimação disponíveis para adoção bem como a divulgação de eventos voltados para a prática de adoção. Sendo assim, nossa missão é tentar fornecer um lar a maior quantidade de animais de estimação em estado de abandono possível.


## Link para o projeto
https://adota-ai.herokuapp.com/


## Wiki
* Para uma documentação mais detalhada e separada em seções (FrontEnd e BackEnd): https://github.com/zsmn/adota.ai/wiki


## Membros
* Victor Miguel de Morais Costa (vmmc2)
* Victor Hugo Meirelles Silva (vhms)
* Zilde Souto Maior Neto (zsmn)


## Ferramentas utilizadas no projeto
* Javascript
* HTML
* CSS
* Bootstrap 4
* Node.js
* Express.js
* JsonWebToken
* Bcrypt.js
* Heroku


## Explicações sobre decisões tomadas no decorrer do projeto
### Aplicação Web x Aplicação Mobile
* Nesse aspecto, a equipe optou por produzir uma aplicação Web devido à grande quantidade de materiais e tutoriais disponíveis sobre esse assunto. Quando procuramos por tutoriais e materiais na área de desenvolvimento mobile, acabamos encontrando uma quantidade menor de recursos. Portanto, acabamos por optar pelo desenvolvimento Web.

### Escolha de Framework para o FrontEnd
* Nesse quesito, nossa equipe seguiu por um caminho diferente das outras equipes da disciplina, e optamos por elaborar o FrontEnd fazendo uso de HTML e CSS puro em conjunto com o framework de FrontEnd Bootstrap 4 e a linguagem Javascript. Não optamos por utilizar o React.js, pois nós acreditamos que, dado o prazo de entrega do projeto, não tinhamos tempo suficiente para aprender sobre esse framework do zero, dado que a sua curva de aprendizado é maior do que a de outros frameworks mais simples (como o próprio Bootstrap). Vale salientar também que nenhum dos integrantes da equipe possuía experiência prévia com a área de desenvolvimento Web. Por isso, optamos por seguir pelo caminho mais simples de maneira que não tivéssemos problemas para entregar um produto que fosse minimamente funcional.

### Escolha de Framework e de outros aspectos para o BackEnd
* Para desenvolver o BackEnd de nossa aplicação, optamos por usar Javascript (ao invés de Go ou Python) por ser uma linguagem bastante popular e que apresenta síntaxe de fácil entendimento e também pela quantidade de materiais existentes sobre ela. Na elaboração do BackEnd de fato, usamos o Node.js em conjunto com o framework Express.js. Optamos por usar essas duas tecnologias por recomendação do professor e porque também achamos um tutorial muito bem formulado feito pela Rocketseat que explicava exatamente o que estávamos querendo fazer e também utilizava essas duas ferramentas. Como nossa aplicação envolve o cadastro e o login/logout de usuários, é necessários que ela seja capaz de gerar tokens e também de fornecer algum tipo de privacidade com criptografia. Para esse fim, utilizamos outras duas bibliotecas de Javascript: "JsonWebToken" e "Bcrypt.js", a primeira, como o nome sugere, é responsável pela geração dos tokens necessários no login dos usuários, já a última é necessária para a encriptação das senhas inseridas pelos usuários no ato de cadastro e de login.

### Escolha de ferramenta para deploy
* Para isso, optamos por usar o Heroku por sua simplicidade e facilidade e pelo fato de um dos integrantes da equipe já possuir uma certa experiência com o seu uso.

## Screenshots
### Página Inicial
![[pagina_inicial]](assets/adotaai-pagina_inicial.png)
### Página de Bichinhos
![[pagina_inicial]](assets/adotaai-pagina_bichinhos.png)
### Página de Cadastro de Bichinhos
![[pagina_inicial]](assets/adotaai-pagina_cadastro_bichinhos.png)
### Página de Eventos
![[pagina_inicial]](assets/adotaai-pagina_eventos.png)
### Página de Cadastro de Eventos
![[pagina_inicial]](assets/adotaai-pagina_cadastro_eventos.png)
### Página de Login

### Página de Cadastro


## Referências utilizadas na elaboração do projeto
* https://github.com/IF977/if977 (Repositório da cadeira de Engenharia de Software)
* https://getbootstrap.com/docs/4.0/getting-started/introduction/ (Documentação Oficial do framework Bootstrap 4)
* https://www.youtube.com/watch?v=BN_8bCfVp88&list=PL85ITvJ7FLoiXVwHXeOsOuVppGbBzo2dp (Série de tutoriais API NodeJS + Express + MongoDB, ministrada pela Rocketseat)
* http://zetcode.com/javascript/axios/ (Tutorial de como usar o Axios com Javascript)
* https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f (Tutorial de como dar um deploy pelo Heroku a partir de um sub-repositório do GitHub)
