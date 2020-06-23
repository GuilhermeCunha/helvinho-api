### Dúvidas:
- O estoque é por cliente ou por piscina? R: Por cliente.
- Quais são todos os parâmetros das piscinas? R: Sempre os mesmos.
- Os produtos usados nas piscinas são sempre os mesmos ? R: Sempre os mesmos.

### Módulos
- Criação da estrutura da aplicação (Backend e Frontend iniciais).
- CRUD das entidades sem relacionamento.
- Gerenciamento de parâmetros.
- Gerenciamento de Estoque.
- Criação e exportação de relatórios de atividades.
- Geração de gráficos (Dashboard).

### Requisitos
- Funcionar bem pelo Celular.
- Guardar sempre os parâmetros das piscinas.
- Guardar sempre estoques dos clientes.
- Criar gráficos para analisar parâmetros das piscinas(Diário / Semanal / Mensal / Semestral / Anual).
- Criar relatório de atividades a serem realizadas (Gerar arquivo padronizado para ser enviado por WhatsApp).

### EXTRAS
- Enviar link para acesso ao relatório criado, e quando o operador acessar o link, marcar o relatório como visualizado.
- Tela para análise de consumo de produtos em cada piscina.


### Modelos
- User OK
  - email
  - username
  - password
  - role
  
- Employee OK
  - name
  - address
  - category ['Operador', 'Ajudante Operador']
  - cellphone
  - secondCellphone
  
- Report OK
  - status
  - message
  
- Parameter OK
	- Cloro
	- Ph
	- Alcalinidade
	- Ácido 
	- Cianurico
  
- Product OK
  - name
  - unit (Litro, Kg, MG..)
  
- ProductQuantity OK
  - product
  - quantity
  
- Stock OK
  - ProductQuantity[]
  - date 
  
- Pool OK
  - name
  - Report[]
  - Parameters[]
  
- Client OK
  - name
  - address
  - cnpj
  - cellphone
  - secondCellphone
  - Pool[]
  - Stocks[]


### Anotações

Parâmetros:
	- Cloro
	- Ph
	- Alcalinidade
	- Ácido 
	- Cianurico