const palavras = [
    { palavra: "casa", segundos: 8 },
    { palavra: "gato", segundos: 8 },
    { palavra: "flor", segundos: 8 },
    { palavra: "mesa", segundos: 8 },
    { palavra: "rio", segundos: 7 },
    { palavra: "sol", segundos: 7 },
    { palavra: "lua", segundos: 7 },
    { palavra: "mar", segundos: 7 },
    { palavra: "pão", segundos: 7 },
    { palavra: "rede", segundos: 9 },
    { palavra: "livro", segundos: 9 },
    { palavra: "chuva", segundos: 9 },
    { palavra: "noite", segundos: 9 },
    { palavra: "amigo", segundos: 9 },
    { palavra: "árvore", segundos: 10 },
    { palavra: "computador", segundos: 13 },
    { palavra: "elefante", segundos: 11 },
    { palavra: "bicicleta", segundos: 11 },
    { palavra: "montanha", segundos: 11 },
    { palavra: "paralelepípedo", segundos: 18 },
    { palavra: "otorrinolaringologista", segundos: 23 },
    { palavra: "escorregadio", segundos: 13 },
    { palavra: "futebol", segundos: 10 },
    { palavra: "cachorro", segundos: 10 },
    { palavra: "girassol", segundos: 10 },
    { palavra: "computação", segundos: 12 },
    { palavra: "astronomia", segundos: 12 },
    { palavra: "biblioteca", segundos: 12 },
    { palavra: "desenvolvimento", segundos: 15 },
    { palavra: "programação", segundos: 13 },
    { palavra: "felicidade", segundos: 11 },
    { palavra: "travesseiro", segundos: 12 },
    { palavra: "ventilador", segundos: 11 },
    { palavra: "helicóptero", segundos: 13 },
    { palavra: "arco-íris", segundos: 10 },
    { palavra: "abacaxi", segundos: 10 },
    { palavra: "esfinge", segundos: 10 },
    { palavra: "labirinto", segundos: 11 },
    { palavra: "xícara", segundos: 9 },
    { palavra: "zumbido", segundos: 10 },
    { palavra: "quadro", segundos: 9 },
    { palavra: "espelho", segundos: 10 },
    { palavra: "teclado", segundos: 10 },
    { palavra: "janela", segundos: 9 },
    { palavra: "cadeira", segundos: 10 },
    { palavra: "lampião", segundos: 11 },
    { palavra: "pássaro", segundos: 10 },
    { palavra: "borboleta", segundos: 11 },
    { palavra: "dinossauro", segundos: 12 },
    { palavra: "universo", segundos: 11 }
];

let intervaloContador; // Armazena o intervalo do contador

// Função para mostrar/ocultar elementos
const mostrarElemento = (id, mostrar = true) => {
    const elemento = document.querySelector(id);
    if (mostrar) {
        elemento.classList.remove("hidden");
    } else {
        elemento.classList.add("hidden");
    }
};

// Função para iniciar o contador
const iniciarContador = (segundos) => {
    mostrarElemento("#clock", false);
    mostrarElemento("#clock_animado");
    let tempoRestante = segundos;
    const atualizarTempo = () => {
        document.querySelector("#segundos").innerHTML = "00 : " + String(tempoRestante).padStart(2, "0");
    };
    intervaloContador = setInterval(() => {
        tempoRestante--;
        atualizarTempo();
        if (tempoRestante <= 0) {
            clearInterval(intervaloContador);
            mostrarElemento("#modal-tempo-esgotado"); // Mostra o modal
            mostrarElemento("#inputs-container", false); // Oculta os inputs
            mostrarElemento("#btn-comecar"); // Mostra o botão "Começar"
            mostrarElemento("#clock");
            mostrarElemento("#clock_animado", false);
        }
    }, 1000);
};

// Função para sortear uma palavra
const sortearPalavra = () => {
    mostrarElemento("#clock");
    mostrarElemento("#clock_animado", false);
    if (intervaloContador) {
        clearInterval(intervaloContador);
    }
    const indice = Math.floor(Math.random() * palavras.length);
    const sorteio = palavras[indice];
    document.querySelector("#palavra_sorteada").innerHTML = sorteio.palavra;
    document.querySelector("#segundos").innerHTML = "00 : " + String(sorteio.segundos).padStart(2, "0");

    // Limpar inputs anteriores
    const inputsContainer = document.querySelector("#inputs-container");
    inputsContainer.innerHTML = "";

    // Criar inputs dinâmicos
    for (let i = 0; i < sorteio.palavra.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1; // Permite apenas 1 caractere por input
        input.autocapitalize = "off"; // Desativa a capitalização automática
        if (i === 0) {
            input.autofocus = true; // Foca no primeiro input
        }
        input.classList.add("w-10", "h-10", "text-center", "bg-dark", "text-light", "rounded-lg", "border-2", "border-light", "focus:outline-none", "focus:border-primary", "transition-all");
        inputsContainer.appendChild(input);
    }

    // Forçar o foco no primeiro input após um pequeno delay
    setTimeout(() => {
        const primeiroInput = document.querySelector("#inputs-container input");
        if (primeiroInput) {
            primeiroInput.focus();
        }
    }, 100); // 100ms de delay para garantir que o input esteja pronto
    
    // Adicionar eventos aos inputs
    const inputs = document.querySelectorAll("#inputs-container input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            if (e.target.value) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus(); // Foca no próximo input
                } else {
                    verificarResposta(); // Último input preenchido, verifica a resposta
                }
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && index > 0) {
                inputs[index - 1].focus(); // Volta ao input anterior ao apagar
            }
        });
    });

    iniciarContador(sorteio.segundos);
};

// Função para verificar a resposta
const verificarResposta = () => {
    const palavraAtual = document.querySelector("#palavra_sorteada").innerHTML;
    const inputs = document.querySelectorAll("#inputs-container input");
    let resposta = "";

    inputs.forEach(input => {
        resposta += input.value.toLowerCase();
    });

    const score = parseInt(document.querySelector("#score").innerHTML);
    if (resposta === palavraAtual) {
        document.querySelector("#score").innerHTML = score + 1;
        // Limpar inputs e sortear nova palavra
        sortearPalavra();
    }
};

// Inicialização do jogo
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#score").innerHTML = "0";
    mostrarElemento("#btn-comecar"); // Mostra o botão "Começar"
    mostrarElemento("#inputs-container", false); // Oculta os inputs
    mostrarElemento("#clock");
    mostrarElemento("#clock_animado", false);
    mostrarElemento("#palavra_sorteada", false)

    // Evento do botão "Começar"
    document.querySelector("#btn-comecar").addEventListener("click", () => {
        mostrarElemento("#btn-comecar", false); // Oculta o botão "Começar"
        mostrarElemento("#inputs-container"); // Mostra os inputs
        sortearPalavra(); // Inicia o jogo
        mostrarElemento("#palavra_sorteada")
    });

    // Evento do botão "Recomeçar" no modal
    document.querySelector("#btn-recomecar").addEventListener("click", () => {
        mostrarElemento("#modal-tempo-esgotado", false); // Oculta o modal
        mostrarElemento("#btn-comecar"); // Mostra o botão "Começar"
        mostrarElemento("#inputs-container", false); // Oculta os inputs
        mostrarElemento("#palavra_sorteada", false);
        document.querySelector("#score").innerHTML = "0";
    });
});
