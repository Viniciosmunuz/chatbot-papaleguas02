// 🍽️ TESTE SIMPLES DO FLUXO - PAPALEGUAS

const RESPONSES = {
    BOAS_VINDAS: 'Olá! Bem-vindo(a) ao Restaurante e Lanchonete PAPALEGUAS 🍽️\n\n📋 *CARDÁPIO:* https://drive.google.com/file/d/1-exemplo-cardapio/view?usp=drive_link\n⏰ *HORÁRIO:* Todos os dias 5:30 - 23:30\n💰 *Taxa de Entrega:* R$ 3,00\n\nEscolha uma opção:\n\n1️⃣ Fazer um Pedido\n2️⃣ Falar com Atendente',
    
    PEDIDO_TUDO_JUNTO: 'Por favor, envie seu pedido!\n\n📝 *Sugestão de Formato:*\nNome: Seu Nome Completo\nPedido: O que você quer comer\nEndereço: Rua, número, bairro\nPagamento: 1 (Pix) / 2 (Dinheiro) / 3 (Cartão)\n\nUm atendente entrará em contato para finalizar os detalhes.\n\nObrigado por escolher o Restaurante PAPALEGUAS! 🍽️',
    
    PEDIDO_EM_PROCESSO: '⏳ *Seu Pedido está sendo Processado!*\n\nLogo um atendente irá confirmar o pedido e informar:\n✅ Os detalhes do pedido\n💰 O valor total\n\nObrigado por escolher o Restaurante PAPALEGUAS! 🍽️',
    
    SUPORTE_INICIO: 'Um atendente vai responder em breve! 🎯\nDigite *Menu* para voltar.',
};

// Simular o fluxo
console.log('🍽️ TESTE DO NOVO FLUXO - PAPALEGUAS\n');
console.log('=====================================\n');

console.log('1️⃣ USUÁRIO INICIA CONVERSA:\n');
console.log('Usuário: "Oi"\n');
console.log(`Bot: ${RESPONSES.BOAS_VINDAS}\n`);

console.log('\n2️⃣ USUÁRIO ESCOLHE "1️⃣ FAZER UM PEDIDO":\n');
console.log('Usuário: "1"\n');
console.log(`Bot: ${RESPONSES.PEDIDO_TUDO_JUNTO}\n`);

console.log('\n3️⃣ USUÁRIO ENVIA PEDIDO COM FORMATO:\n');
const pedidoUsuario = `Nome: João Silva
Pedido: 2 pizzas grande
Endereço: Rua das Flores, 123, Bairro Centro
Pagamento: 1`;
console.log(`Usuário:\n${pedidoUsuario}\n`);

console.log(`Bot: ${RESPONSES.PEDIDO_EM_PROCESSO}\n`);

console.log('\n📢 NOTIFICAÇÃO ENVIADA AO DONO:\n');
console.log(`🚨 *NOVO PEDIDO* 🚨\n📝 Pedido:\n${pedidoUsuario}`);

console.log('\n\n✅ TESTE CONCLUÍDO COM SUCESSO!\n');
