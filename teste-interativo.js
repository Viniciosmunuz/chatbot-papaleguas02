// ═══════════════════════════════════════════════════════════════════
//  🍽️ BOT PAPALEGUAS - TESTE INTERATIVO
// ═══════════════════════════════════════════════════════════════════
// Simule uma conversa completa com o bot no terminal

const readline = require('readline');

// ─── ESTADO DO BOT ───
const userStages = {};
const userData = {};
const INACTIVITY_TIMEOUT = 30 * 60 * 1000;

// ─── MENSAGENS DO BOT (mesmo do chatbot-papaleguas.js) ───
const RESPONSES = {
    BOAS_VINDAS: 'Olá! Bem-vindo(a) ao Restaurante e Lanchonete PAPALEGUAS 🍽️\n\n📋 *CARDÁPIO:* https://drive.google.com/file/d/1-exemplo-cardapio/view?usp=drive_link\n⏰ *HORÁRIO:* Todos os dias 5:30 - 23:30\n💰 *Taxa de Entrega:* R$ 3,00\n\nEscolha uma opção:\n\n1️⃣ Fazer um Pedido\n2️⃣ Falar com Atendente',
    
    MENU_PRINCIPAL: 'Escolha uma opção:\n\n1️⃣ Fazer um Pedido\n2️⃣ Falar com Atendente\n3️⃣ Cardápio',
    
    PEDIDO_TUDO_JUNTO: 'Por favor, envie seu pedido!\n\n📝 *Sugestão de Formato:*\nNome: Seu Nome Completo\nPedido: O que você quer comer\nEndereço: Rua, número, bairro\nPagamento: 1 (Pix) / 2 (Dinheiro) / 3 (Cartão)\n\nUm atendente entrará em contato para finalizar os detalhes.\n\nObrigado por escolher o Restaurante PAPALEGUAS! 🍽️',
    
    PEDIDO_EM_PROCESSO: '⏳ *Seu Pedido está sendo Processado!*\n\nLogo um atendente irá confirmar o pedido e informar:\n✅ Os detalhes do pedido\n💰 O valor total\n\nObrigado por escolher o Restaurante PAPALEGUAS! 🍽️',
    
    FALAR_ATENDENTE: '💬 Você será conectado a um atendente. Um momento...\n\n📞 Atendente disponível: Talvez em breve! Por enquanto, envie seu pedido normalmente.',
    
    CARDAPIO: '📋 *CARDÁPIO COMPLETO*\n\nhttps://drive.google.com/file/d/1-exemplo-cardapio/view?usp=drive_link\n\nDeseja fazer um pedido? Digite *1*',
};

// ─── INTERFACE READLINE ───
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ─── FUNÇÃO PARA DETECTAR GATILHO ───
const isInitialTrigger = text => 
    /(oi|ola|olá|menu|boa tarde|boa noite|bom dia|oi tudo|olá tudo|e aí|oq|start|help)/i.test(text);

// ─── FUNÇÃO PARA ENVIAR MENSAGEM DO BOT ───
function sendMessage(message) {
    console.log('\n🤖 BOT: ' + message);
}

// ─── FUNÇÃO PRINCIPAL DE PROCESSAMENTO ───
function processMessage(userMessage) {
    const from = 'user123'; // ID do usuário no teste
    
    // Inicializa estado do usuário se não existir
    if (!userStages[from]) {
        userStages[from] = 'AGUARDANDO_PRIMEIRO_CONTATO';
        userData[from] = { lastActivity: Date.now() };
    }
    
    let state = userStages[from];
    
    // ─── ESTADO: AGUARDANDO PRIMEIRO CONTATO ───
    if (state === 'AGUARDANDO_PRIMEIRO_CONTATO') {
        if (isInitialTrigger(userMessage)) {
            sendMessage(RESPONSES.BOAS_VINDAS);
            userStages[from] = 'MENU_PRINCIPAL';
        } else {
            sendMessage('Olá! Digite *oi* ou *menu* para começar 👋');
        }
        return;
    }
    
    // ─── ESTADO: MENU PRINCIPAL ───
    if (state === 'MENU_PRINCIPAL') {
        if (userMessage === '1') {
            sendMessage(RESPONSES.PEDIDO_TUDO_JUNTO);
            userStages[from] = 'AGUARDANDO_DADOS_COMPLETOS';
        } else if (userMessage === '2') {
            sendMessage(RESPONSES.FALAR_ATENDENTE);
        } else if (userMessage === '3') {
            sendMessage(RESPONSES.CARDAPIO);
        } else {
            sendMessage('Opção inválida. Digite:\n1️⃣ Para fazer um pedido\n2️⃣ Para falar com atendente\n3️⃣ Para ver cardápio');
        }
        return;
    }
    
    // ─── ESTADO: AGUARDANDO DADOS COMPLETOS (PEDIDO) ───
    if (state === 'AGUARDANDO_DADOS_COMPLETOS') {
        // Aceita qualquer texto como pedido
        userData[from].pedidoCompleto = userMessage;
        
        sendMessage(RESPONSES.PEDIDO_EM_PROCESSO);
        sendMessage('✅ Pedido recebido! Um atendente entrará em contato em breve.');
        
        userStages[from] = 'PEDIDO_CONFIRMADO';
        return;
    }
    
    // ─── ESTADO: PEDIDO CONFIRMADO ───
    if (state === 'PEDIDO_CONFIRMADO') {
        if (/(menu|outra|novo|oi)/i.test(userMessage)) {
            sendMessage(RESPONSES.MENU_PRINCIPAL);
            userStages[from] = 'MENU_PRINCIPAL';
        } else {
            sendMessage('Seu pedido já foi enviado! 👍\n\nDeseja fazer algo mais? Digite *menu* ou aguarde o atendente.');
        }
        return;
    }
}

// ─── INICIAR TESTE ───
console.log('════════════════════════════════════════════════════════════════');
console.log('🍽️  TESTE INTERATIVO - BOT PAPALEGUAS');
console.log('════════════════════════════════════════════════════════════════\n');
console.log('💡 INSTRUÇÕES:');
console.log('   • Digite "oi" para iniciar');
console.log('   • Escolha 1, 2 ou 3 para as opções do menu');
console.log('   • Envie seu pedido no formato sugerido');
console.log('   • Digite "sair" para encerrar o teste\n');
console.log('════════════════════════════════════════════════════════════════\n');

// ─── FUNÇÃO RECURSIVA DE PROMPT ───
function askQuestion() {
    rl.question('👤 VOCÊ: ', (input) => {
        const message = input.trim();
        
        if (message.toLowerCase() === 'sair') {
            console.log('\n👋 Teste finalizado. Até logo!\n');
            rl.close();
            process.exit(0);
        }
        
        if (message === '') {
            askQuestion();
            return;
        }
        
        processMessage(message);
        askQuestion();
    });
}

// Inicia o teste
askQuestion();
