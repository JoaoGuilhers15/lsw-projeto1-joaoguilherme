// ===== 1. DADOS =====
const nomeLoja = "Dada-Largada";
let produtos = [
    {nome: "Porche 911", categoria: "Esportivo", preço: 50, quantidades: 12, vendidos: 7},
    {nome: "RB20", categoria: "Automobilismo", preço: 70, quantidades: 3, vendidos: 5},
    {nome: "Corvette C6", categoria: "Esportivo", preço: 35, quantidades: 23, vendidos: 8},
    {nome: "Nissan Skyline", categoria: "Esportivo", preço: 45, quantidades: 2, vendidos: 32},
    {nome: "Fiat Uno", categoria: "Popular", preço: 20, quantidades: 36, vendidos: 11},
    {nome: "Ferrari F40", categoria: "Esportivo", preço: 60, quantidades: 1, vendidos: 18},
];


// ===== 2. FUNÇÕES =====
function listarProdutos(lista){
    for(let k = 0; k < lista.length; k++){
        console.log(`${k + 1}. ${lista[k].nome} | ${lista[k].categoria} | R$ ${lista[k].preço} | ${lista[k].quantidades} un. | ${lista[k].vendidos} vendidos`);
    }
}

function formatarNome(texto){
    texto = texto.trim().toLowerCase();
    if(texto.length > 0){
        texto = texto[0].toUpperCase() + texto.slice(1);
    }
    return texto;
}

function cadastrarProduto(lista, nome, categoria, preco, quantidade){
    nome = formatarNome(nome);
    lista.push({
        nome,
        categoria,
        preço: preco,
        quantidades: quantidade,
        vendidos: 0
    });
    return lista.length;
}

function calcularValorEstoque(lista){
    let soma = 0;
    for(let k = 0; k < lista.length; k++){
        soma = soma + (lista[k].preço * lista[k].quantidades);
    }
    return soma;
}

function buscarProduto(lista, termo){
    for(let k = 0; k < lista.length; k++){
        if(lista[k].nome.toLowerCase().includes(termo.toLowerCase())){
            return k;
        }
    }
    return null;
}

function produtosEmFalta(lista, minimo){
    return lista.filter(function(produto){
        return produto.quantidades < minimo;
    });
}

function aplicarDesconto(lista, categoria, percentual){
    let alterados = 0;
    for(let k = 0; k < lista.length; k++){
        if(lista[k].categoria == categoria){
            lista[k].preço = lista[k].preço - (lista[k].preço * percentual / 100);
            alterados++;
        }
    }
    return alterados;
}

function registrarVenda(lista, nome, quantidade){
    let produto = buscarProduto(lista, nome);
    if(produto != null && lista[produto].quantidades >= quantidade){
        lista[produto].quantidades -= quantidade;
        lista[produto].vendidos += quantidade;
        return true;
    }
    return false;
}

function converterParaJSON(lista){
    return JSON.stringify(lista);
}

function lerJSON(texto){
    return JSON.parse(texto);
}

function gerarRelatorio(nome, lista){
    let emFalta = produtosEmFalta(lista, 5);

    console.log(`===== RELATÓRIO: ${nome.toUpperCase()} =====`);
    console.log(`Produtos cadastrados: ${lista.length}`);
    console.log(`Valor total em estoque: R$ ${calcularValorEstoque(lista)}`);
    console.log(`Produtos com estoque baixo: ${emFalta.length}`);
    for(let k = 0; k < emFalta.length; k++){
        console.log(`- ${emFalta[k].nome} (${emFalta[k].quantidades} un.)`);
    }
}


// ===== 3. PROGRAMA PRINCIPAL =====

// Tarefa 2
console.log("--- Tarefa 2: listar ---");
listarProdutos(produtos);

// Tarefa 3
console.log("--- Tarefa 3: cadastrar ---");
let quant = cadastrarProduto(produtos, "      fuSCA  ", "Popular", 100, 50);
console.log(`Produto cadastrado! Agora a loja tem ${quant} produtos.`);

// Tarefa 4
console.log("--- Tarefa 4: valor do estoque ---");
console.log(`Valor do estoque: R$ ${calcularValorEstoque(produtos)}`);

// Tarefa 5
console.log("--- Tarefa 5: buscar ---");
let buscas = ["Fiat Uno", "Caminhão"];
for(let b = 0; b < buscas.length; b++){
    let buscado = buscarProduto(produtos, buscas[b]);
    if(buscado == null){
        console.log("Produto não encontrado.");
    }
    else{
        console.log(`Encontrado: ${produtos[buscado].nome} - R$ ${produtos[buscado].preço}`);
    }
}

// Tarefa 6
console.log("--- Tarefa 6: em falta ---");
let minimo = 5;
let emFalta = produtosEmFalta(produtos, minimo);
console.log(`Produtos com menos de ${minimo} unidades: ${emFalta.length}`);

// Tarefa 7
console.log("--- Tarefa 7: desconto ---");
console.log(`${aplicarDesconto(produtos, "Esportivo", 10)} produtos receberam desconto.`);
console.log(`Novo preço do ${produtos[0].nome}: R$ ${produtos[0].preço}`);

// Tarefa 8
console.log("--- Tarefa 8: registrar venda ---");
let nomeProduto = "Fiat Uno";
if(registrarVenda(produtos, nomeProduto, 3)){
    let i = buscarProduto(produtos, nomeProduto);
    console.log(`Venda realizada! ${produtos[i].nome}: ${produtos[i].quantidades} un. em estoque, ${produtos[i].vendidos} vendidos.`);
}
if(!registrarVenda(produtos, nomeProduto, 9999)){
    console.log("Venda não realizada: estoque insuficiente ou produto inexistente.");
}

// Tarefa 9
console.log("--- Tarefa 9: formatar nome ---");
console.log(formatarNome("        SKYliNe                             "));

// Tarefa 10
console.log("--- Tarefa 10: JSON ---");
let arquivojson = converterParaJSON(produtos);
console.log(typeof(arquivojson));
let lista = lerJSON(arquivojson);
console.log(`Itens recuperados: ${lista.length} | Primeiro: ${lista[0].nome}`);

// Tarefa 11
console.log("--- Tarefa 11: relatório ---");
gerarRelatorio(nomeLoja, produtos);