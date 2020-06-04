# eColeta

#### Aplicação Desenvolvida durante a Nex Level Week </h4>


- [x] Passo 1 - Criação e Configuração da API

## Uso do Typescript 
<p>- Como  a API será desenvolvido utilizando Typescript, será necessário criar o seguinte arquivo <strong>tsconfig.json</strong> na pasta raiz do projeto, 
o arquivo deverá conter as seguintes informações: 

```
{
    "compileOnSave": false, 
    "compilerOptions": {
    "outDir": "./dist",
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es6",
    "lib": [
    "dom",
    "es2018"
    ],
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "noImplicitAny": false,
    "typeRoots": [
    "./node_modules/@types"
    ]
    },
    "exclude": [
    "node_modules",
    "dist"
    ]
}
```
</p>
