# Plantão na Drogaria — Desafio de Farmacovigilância

Protótipo demonstrativo em português brasileiro para o 3º ano do curso técnico em Farmácia. Todos os nomes e dados são fictícios. Não é uma avaliação oficial nem uma ferramenta de atendimento.

## Executar

Sem instalação de pacotes. Na pasta do repositório, execute com Python 3:

```sh
python3 -m http.server 8001 --bind 0.0.0.0
```

No computador que está executando o servidor, abra o navegador na porta 8001. Também é possível abrir `index.html` diretamente, pois não há módulos, chamadas de API ou arquivos externos necessários.

## Celular Android

Opção local: baixe a pasta do projeto para um computador com Python 3. Inicie o servidor acima. Conecte computador e celular à mesma rede Wi-Fi. No navegador do celular, digite `http://IP-LOCAL-DO-COMPUTADOR:8001` (por exemplo, substitua o IP por aquele mostrado nas configurações de rede do computador). Permita a porta 8001 no firewall apenas na rede privada, se necessário. O celular não acessa o computador usando `localhost`.

Se o servidor estiver nesta máquina na nuvem, o endereço local do seu computador não apontará para ele. Para testar nesse caso, publique os três arquivos `index.html`, `style.css` e `app.js` em uma hospedagem estática, como GitHub Pages, e abra o endereço HTTPS publicado no celular. Não há necessidade de banco de dados ou serviços pagos. A publicação não foi realizada automaticamente.

## Teste manual

1. Inicie a avaliação, informe um nome fictício e selecione uma alternativa em cada uma das cinco questões.
2. Verifique que não é possível avançar sem responder e que nenhuma resposta correta é exibida durante a avaliação.
3. Volte uma etapa e altere uma escolha. Ela deve ser preservada ao navegar.
4. Para nota 10, use B, A, D, C, B. Cada acerto vale 2; erros valem 0.
5. Confira acertos, erros e explicações no final. Reinicie para limpar o plantão.
6. No celular, confira legibilidade, botões, rolagem e uso em orientação vertical e horizontal.

## Teste automatizado

Com o servidor em execução e Playwright e Chromium disponíveis:

```sh
node tests/browser.cjs
```

O teste usa `/usr/bin/chromium` e valida todas as notas possíveis, navegação, alteração de resposta, reinício, escape do nome e ausência de rolagem horizontal em quatro larguras. `TEST_URL` permite mudar o destino.

## Cuidados científicos e pedagógicos

O caso se passa em 2003, antes da retirada do Vioxx (rofecoxibe), em 2004, associada ao aumento do risco cardiovascular. Sintomas isolados não confirmam causalidade ou diagnóstico. Tontura e palpitações exigem atenção e avaliação clínica; dor no peito, falta de ar ou quase desmaio exigem atendimento de emergência. O técnico acolhe, comunica e apoia o registro, sem diagnosticar, prescrever ou ajustar medicamentos. A questão sobre RDC 406/2020 é uma revisão fora da linha do tempo, restrita à finalidade das boas práticas de farmacovigilância para detentores de registro de medicamentos de uso humano.

Referências oficiais estão indicadas no resultado. O acesso à referência da RDC foi bloqueado pela política de rede durante a implementação; a revisão do texto não equivale a validação clínica independente. Recomenda-se revisão docente antes de uso em turma.

O nome e as respostas ficam apenas na memória da página; atualizar ou fechar a página apaga a sessão. Não há cadastro, coleta, armazenamento persistente, cronômetro ou bônus por velocidade.
