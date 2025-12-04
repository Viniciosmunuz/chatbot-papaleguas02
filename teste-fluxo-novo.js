// 🍽️ TESTE DO NOVO FLUXO DE PEDIDOS - PAPALEGUAS
// Script para simular e testar o novo fluxo de pedidos flexível

const readline = require('readline');

// Simular estado do usuário
const userStages = {};
const userData = {};

const RESPONSES = {
    BOAS_VINDAS: 'Olá! Bem-vindo(a) ao Restaurante e Lanchonete PAPALEGUAS 🍽️\n\n📋 *CARDÁPIO:* https://drive.google.com/file/d/1-exemplo-cardapio/view?usp=drive_link\n⏰ *HORÁRIO:* Todos os dias 5:30 - 23:30\n💰 *Taxa de Entrega:* R$ 3,00\n\nEscolha uma opção:\n\n1️⃣ Fazer um Pedido\n2️⃣ Falar com Atendente',
    
    PEDIDO_TUDO_JUNTO: '📝 *Envie seu pedido do jeito que preferir!*\n\n💬 Pode ser:\n• Uma lista de itens\n• Uma descrição simples\n• Qualquer coisa que queira pedir\n\n✨ Não precisa de formato específico! Um atendente entrará em contato para confirmar os detalhes (nome, endereço, forma de pagamento) e informar o valor.',
    
    PEDIDO_EM_PROCESSO: '⏳ *Pedido Enviado com Sucesso!*\n\nUm atendente entrará em contato em breve para:\n✅ Confirmar os detalhes\n💰 Informar o valor total + taxa de entrega\n🚚 Informar o tempo de entrega\n\nObrigado por escolher PAPALEGUAS! 🍽️',
    
    SUPORTE_INICIO: 'Um atendente vai responder em breve! 🎯\nDigite *Menu* para voltar.',
    RESPOSTA_PADRAO: 'Não entendi. Digite *Menu* para ver as opções.',
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isInitialTrigger(text) {
    return /(oi|ola|olá|menu|boa tarde|boa noite|bom dia|oi tudo|olá tudo|e aí)/i.test(text);
}

async function processMessage(body) {
    body = (body || '').trim();
    let state = userStages['user'] || null;

    console.log(`\n📨 Você: "${body}"`);

    // Volta ao menu
    if (state === 'SUPORTE' && isInitialTrigger(body)) {
        console.log(`\n🤖 Bot: ${RESPONSES.BOAS_VINDAS}`);
        userStages['user'] = 'MENU_PRINCIPAL';
        return;
    }

    // Inicia conversa
    if (!state && isInitialTrigger(body)) {
        console.log(`\n🤖 Bot: ${RESPONSES.BOAS_VINDAS}`);
        userStages['user'] = 'MENU_PRINCIPAL';
        return;
    }

    // MENU PRINCIPAL
    if (state === 'MENU_PRINCIPAL') {
        if (body === '1') {
            console.log(`\n🤖 Bot: ${RESPONSES.PEDIDO_TUDO_JUNTO}`);
            userStages['user'] = 'AGUARDANDO_DADOS_COMPLETOS';
            userData['user'] = userData['user'] || {};
            return;
        }
        if (body === '2') {
            console.log(`\n🤖 Bot: ${RESPONSES.SUPORTE_INICIO}`);
            userStages['user'] = 'SUPORTE';
            return;
        }
        console.log(`\n🤖 Bot: ${RESPONSES.RESPOSTA_PADRAO}`);
        return;
    }

    // FLUXO DE PEDIDO - ACEITA QUALQUER COISA
    if (state === 'AGUARDANDO_DADOS_COMPLETOS') {
        const pedido = body.trim();
        console.log(`\n✅ Pedido recebido: "${pedido}"`);
        console.log(`\n🤖 Bot: ${RESPONSES.PEDIDO_EM_PROCESSO}`);
        console.log(`\n📢 NOTIFICAÇÃO DO DONO:\n🚨 *NOVO PEDIDO* 🚨\nPedido:\n${pedido}`);
        
        userStages['user'] = 'PEDIDO_CONFIRMADO';
        return;
    }

    if (state === 'PEDIDO_CONFIRMADO') {
        console.log(`\n🤖 Bot: ✅ Seu pedido está sendo processado! Um atendente entrará em contato em breve.`);
        return;
    }

    // Resposta padrão
    if (state && state !== 'SUPORTE') {
        console.log(`\n🤖 Bot: ${RESPONSES.RESPOSTA_PADRAO}`);
    }
}

// Interface de teste interativa
console.log('🍽️ TESTE DO NOVO FLUXO - PAPALEGUAS');
console.log('=====================================');
console.log('Digite "sair" para encerrar o teste\n');

function promptUser() {
    rl.question('Você: ', async (input) => {
        if (input.toLowerCase() === 'sair') {
            console.log('\n👋 Teste finalizado!');
            rl.close();
            return;
        }
        
        await processMessage(input);
        promptUser();
    });
}

// Iniciar teste
console.log(`🤖 Bot: ${RESPONSES.BOAS_VINDAS}\n`);
userStages['user'] = 'MENU_PRINCIPAL';
promptUser();
