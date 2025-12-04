// 🍽️ TESTE INTERATIVO DO FLUXO - PAPALEGUAS
// Digite as mensagens e veja o bot respondendo em tempo real

const readline = require('readline');

const userStages = {};
const userData = {};

const RESPONSES = {
    BOAS_VINDAS: 'Olá! Bem-vindo(a) ao Restaurante e Lanchonete PAPALEGUAS 🍽️\n\n📋 *CARDÁPIO:* https://drive.google.com/file/d/1-exemplo-cardapio/view?usp=drive_link\n⏰ *HORÁRIO:* Todos os dias 5:30 - 23:30\n💰 *Taxa de Entrega:* R$ 3,00\n\nEscolha uma opção:\n\n1️⃣ Fazer um Pedido\n2️⃣ Falar com Atendente',
    
    PEDIDO_TUDO_JUNTO: 'Por favor, envie seu pedido!\n\n📝 *Sugestão de Formato:*\nNome: Seu Nome Completo\nPedido: O que você quer comer\nEndereço: Rua, número, bairro\nPagamento: 1 (Pix) / 2 (Dinheiro) / 3 (Cartão)\n\nUm atendente entrará em contato para finalizar os detalhes.\n\nObrigado por escolher o Restaurante PAPALEGUAS! 🍽️',
    
    PEDIDO_EM_PROCESSO: '⏳ *Seu Pedido está sendo Processado!*\n\nLogo um atendente irá confirmar o pedido e informar:\n✅ Os detalhes do pedido\n💰 O valor total\n\nObrigado por escolher o Restaurante PAPALEGUAS! 🍽️',
    
    SUPORTE_INICIO: 'Um atendente vai responder em breve! 🎯\nDigite *Menu* para voltar.',
    RESPOSTA_PADRAO: 'Não entendi. Digite *Menu* para ver as opções.',
};

function isInitialTrigger(text) {
    return /(oi|ola|olá|menu|boa tarde|boa noite|bom dia|oi tudo|olá tudo|e aí)/i.test(text);
}

async function processMessage(body) {
    body = (body || '').trim();
    let state = userStages['user'] || null;

    // Volta ao menu
    if (state === 'SUPORTE' && isInitialTrigger(body)) {
        console.log(`\n🤖 Bot:\n${RESPONSES.BOAS_VINDAS}\n`);
        userStages['user'] = 'MENU_PRINCIPAL';
        return;
    }

    // Inicia conversa
    if (!state && isInitialTrigger(body)) {
        console.log(`\n🤖 Bot:\n${RESPONSES.BOAS_VINDAS}\n`);
        userStages['user'] = 'MENU_PRINCIPAL';
        return;
    }

    // MENU PRINCIPAL
    if (state === 'MENU_PRINCIPAL') {
        if (body === '1') {
            console.log(`\n🤖 Bot:\n${RESPONSES.PEDIDO_TUDO_JUNTO}\n`);
            userStages['user'] = 'AGUARDANDO_DADOS_COMPLETOS';
            userData['user'] = userData['user'] || {};
            return;
        }
        if (body === '2') {
            console.log(`\n🤖 Bot:\n${RESPONSES.SUPORTE_INICIO}`);
            userStages['user'] = 'SUPORTE';
            console.log('\nDigite *Menu* para voltar.\n');
            return;
        }
        console.log(`\n🤖 Bot:\n${RESPONSES.RESPOSTA_PADRAO}\n`);
        return;
    }

    // FLUXO DE PEDIDO - ACEITA QUALQUER COISA
    if (state === 'AGUARDANDO_DADOS_COMPLETOS') {
        const pedido = body.trim();
        console.log(`\n✅ Pedido recebido!\n`);
        console.log(`🤖 Bot:\n${RESPONSES.PEDIDO_EM_PROCESSO}\n`);
        console.log(`\n📢 NOTIFICAÇÃO DO DONO:\n🚨 *NOVO PEDIDO* 🚨\nPedido:\n${pedido}\n`);
        
        userStages['user'] = 'PEDIDO_CONFIRMADO';
        return;
    }

    if (state === 'PEDIDO_CONFIRMADO') {
        console.log(`\n🤖 Bot:\n✅ Seu pedido está sendo processado! Um atendente entrará em contato em breve.\n`);
        return;
    }

    // Resposta padrão
    if (state && state !== 'SUPORTE') {
        console.log(`\n🤖 Bot:\n${RESPONSES.RESPOSTA_PADRAO}\n`);
    }
}

// Interface de teste interativa
console.log('\n🍽️ ═══════════════════════════════════════════════════════════════');
console.log('  TESTE INTERATIVO DO FLUXO - RESTAURANTE PAPALEGUAS');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('Digite "sair" para encerrar o teste\n');
console.log('Comece digitando: oi, olá, menu\n');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question('👤 Você: ', async (input) => {
        if (input.toLowerCase() === 'sair') {
            console.log('\n👋 Teste finalizado!\n');
            rl.close();
            return;
        }
        
        await processMessage(input);
        promptUser();
    });
}

// Iniciar teste
console.log(`🤖 Bot:\n${RESPONSES.BOAS_VINDAS}\n`);
userStages['user'] = 'MENU_PRINCIPAL';
promptUser();
