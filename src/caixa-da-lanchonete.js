class CaixaDaLanchonete {
    constructor() {
      this.cardapio = [
        { codigo: "cafe", descricao: "Café", valor: 3.0 },
        { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.5 },
        { codigo: "suco", descricao: "Suco Natural", valor: 6.2 },
        { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5 },
        { codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
        { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
        { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
        { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
      ];
  
      this.formasDePagamento = ["dinheiro", "debito", "credito"];
    }
  
    calcularValorDaCompra(metodoDePagamento, itens) {
      if (!this.formasDePagamento.includes(metodoDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      let valorTotal = 0;
  
      let itensPrincipais = new Set();
  
      for (const itemStr of itens) {
        const [itemCodigo, quantidade] = itemStr.split(",");
        const quantidadeInt = parseInt(quantidade);

        if (typeof quantidade === "string" && quantidade.trim() === "0") {
            return "Quantidade inválida!";
          }
          
        const menuItem = this.cardapio.find((menu) => menu.codigo === itemCodigo);
  
        if (!menuItem) {
          return "Item inválido!";
        }
  
        if (!menuItem.descricao.includes("extra")) {
          itensPrincipais.add(menuItem.codigo);
        } else {
          const extrasPrincipais = {
            queijo: "sanduiche",
            chantily: "cafe",
          };
  
          if (Object.keys(extrasPrincipais).includes(itemCodigo)) {
            const itemPrincipalCodigo = extrasPrincipais[itemCodigo];
            if (!itensPrincipais.has(itemPrincipalCodigo)) {
              return "Item extra não pode ser pedido sem o principal";
            }
          }
        }
  
        valorTotal += menuItem.valor * quantidadeInt;
      }
  
      if (metodoDePagamento === "dinheiro") {
        valorTotal *= 0.95;
      } else if (metodoDePagamento === "credito") {
        valorTotal *= 1.03;
      }
  
      return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
  }

  export { CaixaDaLanchonete };
  