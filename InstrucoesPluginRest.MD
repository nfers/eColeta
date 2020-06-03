# Para usar o RestClient:

[x] - criar um arquivo com extensão '.http'

`exemplot: 'http://localhost:3030/users'`

[x] - para executar o teste da rota e obter o retorno: 

comando: `Crtl + Alt + R`

[x] - No lado esquerdo abrirá um arquivo com as informações
da requisição e também com o retorno da API

exemplo de retorno: 
<code> HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 48
ETag: W/"30-jXUhQHaK8XKZ90sM+ElyvdfnvJk"
Date: Wed, 03 Jun 2020 13:57:01 GMT
Connection: close

{
  "result": "Ok",
  "data": [
    "Listagem de Usuários"
  ]
}
</code>