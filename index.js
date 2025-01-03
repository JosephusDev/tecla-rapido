const palavras = [
    { palavra: "casa", segundos: 5 },
    { palavra: "gato", segundos: 5 },
    { palavra: "flor", segundos: 5 },
    { palavra: "mesa", segundos: 5 },
    { palavra: "rio", segundos: 4 },
    { palavra: "sol", segundos: 4 },
    { palavra: "lua", segundos: 4 },
    { palavra: "mar", segundos: 4 },
    { palavra: "pão", segundos: 4 },
    { palavra: "rede", segundos: 6 },
    { palavra: "livro", segundos: 6 },
    { palavra: "chuva", segundos: 6 },
    { palavra: "noite", segundos: 6 },
    { palavra: "amigo", segundos: 6 },
    { palavra: "árvore", segundos: 7 },
    { palavra: "computador", segundos: 10 },
    { palavra: "elefante", segundos: 8 },
    { palavra: "bicicleta", segundos: 8 },
    { palavra: "montanha", segundos: 8 },
    { palavra: "paralelepípedo", segundos: 15 },
    { palavra: "otorrinolaringologista", segundos: 20 },
    { palavra: "escorregadio", segundos: 10 },
    { palavra: "futebol", segundos: 7 },
    { palavra: "cachorro", segundos: 7 },
    { palavra: "girassol", segundos: 7 },
    { palavra: "computação", segundos: 9 },
    { palavra: "astronomia", segundos: 9 },
    { palavra: "biblioteca", segundos: 9 },
    { palavra: "desenvolvimento", segundos: 12 },
    { palavra: "programação", segundos: 10 },
    { palavra: "felicidade", segundos: 8 },
    { palavra: "travesseiro", segundos: 9 },
    { palavra: "ventilador", segundos: 8 },
    { palavra: "helicóptero", segundos: 10 },
    { palavra: "arco-íris", segundos: 7 },
    { palavra: "abacaxi", segundos: 7 },
    { palavra: "esfinge", segundos: 7 },
    { palavra: "labirinto", segundos: 8 },
    { palavra: "xícara", segundos: 6 },
    { palavra: "zumbido", segundos: 7 },
    { palavra: "quadro", segundos: 6 },
    { palavra: "espelho", segundos: 7 },
    { palavra: "teclado", segundos: 7 },
    { palavra: "janela", segundos: 6 },
    { palavra: "cadeira", segundos: 7 },
    { palavra: "lampião", segundos: 8 },
    { palavra: "pássaro", segundos: 7 },
    { palavra: "borboleta", segundos: 8 },
    { palavra: "dinossauro", segundos: 9 },
    { palavra: "universo", segundos: 8 }
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
        if (i === 0) {
            input.autofocus = true; // Foca no primeiro input
        }
        input.classList.add("w-10", "h-10", "text-center", "bg-dark", "text-light", "rounded-lg", "border-2", "border-light", "focus:outline-none", "focus:border-primary", "transition-all");
        inputsContainer.appendChild(input);
    }

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
    }

    // Limpar inputs e sortear nova palavra
    sortearPalavra();
};

// Inicialização do jogo
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#score").innerHTML = "0";
    mostrarElemento("#btn-comecar"); // Mostra o botão "Começar"
    mostrarElemento("#inputs-container", false); // Oculta os inputs
    mostrarElemento("#clock");
    mostrarElemento("#clock_animado", false);

    // Evento do botão "Começar"
    document.querySelector("#btn-comecar").addEventListener("click", () => {
        mostrarElemento("#btn-comecar", false); // Oculta o botão "Começar"
        mostrarElemento("#inputs-container"); // Mostra os inputs
        sortearPalavra(); // Inicia o jogo
    });

    // Evento do botão "Recomeçar" no modal
    document.querySelector("#btn-recomecar").addEventListener("click", () => {
        mostrarElemento("#modal-tempo-esgotado", false); // Oculta o modal
        mostrarElemento("#btn-comecar"); // Mostra o botão "Começar"
        mostrarElemento("#inputs-container", false); // Oculta os inputs
        document.querySelector("#palavra_sorteada").innerHTML = `" Prepare-se "`; // Zera o score
    });
});