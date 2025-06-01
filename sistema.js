// Base de dados
let professores = [
    { login: 'prof', senha: '123' }  // Professor padrão para teste
];

let alunos = [];

// Dados das turmas e módulos
const turmas = {
    turmaA: {
        nome: "Turma A - Manhã",
        modulo: "modulo1",
        horario: "08:00 - 11:00"
    },
    turmaB: {
        nome: "Turma B - Noite",
        modulo: "modulo2",
        horario: "19:00 - 22:00"
    }
};

// Dados das provas e notas
const modulosIngles = {
    modulo1: {
        nome: "Módulo 1 - Básico",
        provas: [
            { nome: "Prova 1", data: "A definir", nota: 0 },
            { nome: "Prova 2", data: "A definir", nota: 0 },
            { nome: "Prova 3", data: "A definir", nota: 0 }
        ]
    },
    modulo2: {
        nome: "Módulo 2 - Avançado",
        provas: [
            { nome: "Prova 1", data: "A definir", nota: 0 },
            { nome: "Prova 2", data: "A definir", nota: 0 },
            { nome: "Prova 3", data: "A definir", nota: 0 }
        ]
    }
};

// Função para mostrar menu inicial
function menuInicial() {
    console.clear();
    console.log('=== SISTEMA DE LOGIN ESCOLAR ===');
    console.log('1 - Login como Professor');
    console.log('2 - Login como Aluno');
    console.log('3 - Sair');

    let opcao = prompt('Escolha uma opção:');
    switch(opcao) {
        case '1':
            loginProfessor();
            break;
        case '2':
            loginAluno();
            break;
        case '3':
            console.log('Saindo...');
            return;
        default:
            console.log('Opção inválida!');
            menuInicial();
    }
}

// Função de login do professor
function loginProfessor() {
    console.clear();
    console.log('=== LOGIN PROFESSOR ===');
    let login = prompt('Login:');
    let senha = prompt('Senha:');

    let professor = professores.find(p => p.login === login && p.senha === senha);
    
    if (professor) {
        console.log('Login realizado com sucesso!');
        menuProfessor();
    } else {
        console.log('Login ou senha incorretos!');
        menuInicial();
    }
}

// Menu do professor
function menuProfessor() {
    console.clear();
    console.log('=== MENU PROFESSOR ===');
    console.log('1 - Cadastrar novo aluno');
    console.log('2 - Buscar e editar aluno');
    console.log('3 - Gerenciar datas das provas');
    console.log('4 - Voltar');

    let opcao = prompt('Escolha uma opção:');
    switch(opcao) {
        case '1':
            cadastrarAluno();
            break;
        case '2':
            listarAlunos();
            break;
        case '3':
            gerenciarDatasProvas();
            break;
        case '4':
            menuInicial();
            break;
        default:
            console.log('Opção inválida!');
            menuProfessor();
    }
}

// Função para cadastrar aluno
function cadastrarAluno() {
    console.clear();
    console.log('=== CADASTRO DE ALUNO ===');
    
    let ra = prompt('RA do aluno:');
    // Verificar se RA já existe
    if (alunos.find(a => a.ra === ra)) {
        console.log('Erro: Este RA já está cadastrado!');
        menuProfessor();
        return;
    }

    let nome = prompt('Nome completo do aluno:');
    let senha = prompt('Senha para o aluno:');

    // Escolha da turma
    console.log('\nEscolha a turma do aluno:');
    console.log('1 - Turma A - Manhã (Módulo Básico)');
    console.log('2 - Turma B - Noite (Módulo Avançado)');
    
    let opcaoTurma = prompt('Escolha uma opção:');
    let turmaEscolhida;
    
    switch(opcaoTurma) {
        case '1':
            turmaEscolhida = 'turmaA';
            break;
        case '2':
            turmaEscolhida = 'turmaB';
            break;
        default:
            console.log('Opção inválida!');
            menuProfessor();
            return;
    }

    // Criar notas baseadas no módulo da turma
    let moduloAluno = turmas[turmaEscolhida].modulo;
    let notasAluno = {
        [moduloAluno]: JSON.parse(JSON.stringify(modulosIngles[moduloAluno]))
    };

    let novoAluno = {
        ra: ra,
        nome: nome,
        senha: senha,
        turma: turmaEscolhida,
        notas: notasAluno
    };

    alunos.push(novoAluno);
    console.log('Aluno cadastrado com sucesso!');
    console.log('RA:', ra);
    console.log('Nome:', nome);
    console.log('Turma:', turmas[turmaEscolhida].nome);
    
    prompt('Pressione Enter para continuar...');
    menuProfessor();
}

// Função para listar alunos
function listarAlunos() {
    console.clear();
    console.log('=== BUSCAR ALUNO ===');
    
    console.log('\nEscolha a turma para visualizar:');
    console.log('1 - Turma A - Manhã (Módulo Básico)');
    console.log('2 - Turma B - Noite (Módulo Avançado)');
    console.log('3 - Todas as turmas');
    console.log('4 - Voltar ao menu principal');
    
    let opcaoTurma = prompt('Escolha uma opção:');
    
    if (opcaoTurma === '4') {
        menuProfessor();
        return;
    }
    
    let alunosFiltrados = [];
    
    switch(opcaoTurma) {
        case '1':
            alunosFiltrados = alunos.filter(a => a.turma === 'turmaA');
            break;
        case '2':
            alunosFiltrados = alunos.filter(a => a.turma === 'turmaB');
            break;
        case '3':
            alunosFiltrados = alunos;
            break;
        default:
            console.log('Opção inválida!');
            prompt('Pressione Enter para continuar...');
            listarAlunos();
            return;
    }

    if (alunosFiltrados.length === 0) {
        console.log('\nNenhum aluno encontrado nesta turma.');
        prompt('Pressione Enter para voltar...');
        listarAlunos();
        return;
    }

    console.log('\nAlunos encontrados:');
    alunosFiltrados.forEach(aluno => {
        console.log(`RA: ${aluno.ra} - Nome: ${aluno.nome} - ${turmas[aluno.turma].nome}`);
    });

    console.log('\nOpções:');
    console.log('1 - Editar notas de um aluno');
    console.log('2 - Voltar para seleção de turma');
    console.log('3 - Voltar ao menu principal');

    let opcao = prompt('Escolha uma opção:');

    switch(opcao) {
        case '1':
            let ra = prompt('\nDigite o RA do aluno para editar suas notas:');
            let aluno = alunos.find(a => a.ra === ra);
            if (!aluno) {
                console.log('Aluno não encontrado!');
                prompt('Pressione Enter para tentar novamente...');
                listarAlunos();
                return;
            }
            editarNotas(aluno);
            break;
        case '2':
            listarAlunos();
            break;
        case '3':
            menuProfessor();
            break;
        default:
            console.log('Opção inválida!');
            prompt('Pressione Enter para continuar...');
            listarAlunos();
    }
}

// Função de login do aluno
function loginAluno() {
    console.clear();
    console.log('=== LOGIN ALUNO ===');
    let ra = prompt('RA:');
    let senha = prompt('Senha:');

    let aluno = alunos.find(a => a.ra === ra && a.senha === senha);
    
    if (aluno) {
        console.log('Login realizado com sucesso!');
        console.log(`Bem-vindo(a), ${aluno.nome}!`);
        menuAluno(aluno);
    } else {
        console.log('RA ou senha incorretos!');
        menuInicial();
    }
}

// Menu do aluno
function menuAluno(aluno) {
    console.clear();
    console.log('=== MENU ALUNO ===');
    console.log('1 - Consulta');
    console.log('2 - Grade');
    console.log('3 - Boletim');
    console.log('4 - Sair');

    let opcao = prompt('Escolha uma opção:');
    switch(opcao) {
        case '1':
            consultaAluno(aluno);
            break;
        case '2':
            gradeAluno(aluno);
            break;
        case '3':
            boletimAluno(aluno);
            break;
        case '4':
            menuInicial();
            break;
        default:
            console.log('Opção inválida!');
            menuAluno(aluno);
    }
}

// Função para calcular média
function calcularMedia(provas) {
    let soma = 0;
    provas.forEach(prova => {
        soma += prova.nota;
    });
    return soma / provas.length;
}

// Função para converter nota com vírgula para número
function converterNota(nota) {
    // Substitui vírgula por ponto e converte para número
    return parseFloat(nota.replace(',', '.'));
}

// Função para formatar nota para exibição
function formatarNota(nota) {
    // Garante que a nota tenha sempre uma casa decimal
    return nota.toFixed(1).replace('.', ',');
}

// Função para consulta do aluno
function consultaAluno(aluno) {
    console.clear();
    console.log('=== CONSULTA ===');
    console.log('Nome:', aluno.nome);
    console.log('RA:', aluno.ra);
    console.log('Turma:', turmas[aluno.turma].nome);
    console.log('Horário:', turmas[aluno.turma].horario);
    console.log('Senha:', aluno.senha);
    
    console.log('\n=== SITUAÇÃO ACADÊMICA ===');
    for (let modulo in aluno.notas) {
        console.log(`\n${aluno.notas[modulo].nome}`);
        
        // Mostrar notas individuais
        aluno.notas[modulo].provas.forEach(prova => {
            console.log(`${prova.nome}: ${formatarNota(prova.nota)}`);
        });
        
        // Calcular e mostrar média
        let media = calcularMedia(aluno.notas[modulo].provas);
        console.log(`Média Final: ${formatarNota(media)}`);
        
        // Mostrar status (Aprovado/Reprovado)
        let status = media >= 6 ? 'APROVADO' : 'REPROVADO';
        let cor = media >= 6 ? '\x1b[32m' : '\x1b[31m';
        console.log(`Status: ${cor}${status}\x1b[0m`);
    }

    console.log('\n1 - Voltar');
    prompt('Pressione Enter para voltar...');
    menuAluno(aluno);
}

// Função para mostrar grade
function gradeAluno(aluno) {
    console.clear();
    console.log('=== GRADE - CURSO DE INGLÊS ===');
    
    for (let modulo in modulosIngles) {
        console.log(`\n${modulosIngles[modulo].nome}`);
        modulosIngles[modulo].provas.forEach(prova => {
            console.log(`${prova.nome}: ${prova.data}`);
        });
    }
    
    console.log('\n1 - Voltar');
    prompt('Pressione Enter para voltar...');
    menuAluno(aluno);
}

// Função para mostrar boletim
function boletimAluno(aluno) {
    console.clear();
    console.log('=== BOLETIM ===');
    
    for (let modulo in aluno.notas) {
        console.log(`\n${aluno.notas[modulo].nome}`);
        let somaNotas = 0;
        aluno.notas[modulo].provas.forEach(prova => {
            console.log(`${prova.nome}: ${formatarNota(prova.nota)}`);
            somaNotas += prova.nota;
        });
        let media = somaNotas / aluno.notas[modulo].provas.length;
        console.log(`Média Final: ${formatarNota(media)}`);
        
        // Mostrar status (Aprovado/Reprovado)
        let status = media >= 6 ? 'APROVADO' : 'REPROVADO';
        let cor = media >= 6 ? '\x1b[32m' : '\x1b[31m';
        console.log(`Status: ${cor}${status}\x1b[0m`);
    }
    
    console.log('\n1 - Voltar');
    prompt('Pressione Enter para voltar...');
    menuAluno(aluno);
}

// Função para editar notas
function editarNotas(aluno) {
    while (true) {
        console.clear();
        console.log(`=== EDITAR NOTAS ===`);
        console.log(`Aluno: ${aluno.nome}`);
        console.log(`RA: ${aluno.ra}`);
        console.log(`Turma: ${turmas[aluno.turma].nome}\n`);
        
        // Mostrar notas atuais
        console.log('=== NOTAS ATUAIS ===');
        let todasProvas = [];
        
        for (let modulo in aluno.notas) {
            console.log(`\n${aluno.notas[modulo].nome}:`);
            aluno.notas[modulo].provas.forEach((prova, index) => {
                let numeroProva = todasProvas.length + 1;
                console.log(`${numeroProva}. ${prova.nome}: ${formatarNota(prova.nota)}`);
                todasProvas.push({
                    modulo: modulo,
                    index: index,
                    nome: prova.nome,
                    nota: prova.nota
                });
            });
        }

        // Menu de opções
        console.log('\nEscolha uma opção:');
        console.log(`1 até ${todasProvas.length} - Selecionar prova para editar`);
        console.log(`${todasProvas.length + 1} - Voltar ao menu anterior`);

        let opcao = prompt('Digite sua escolha:');
        let numeroOpcao = parseInt(opcao);

        if (numeroOpcao === todasProvas.length + 1) {
            return;
        }

        if (numeroOpcao > 0 && numeroOpcao <= todasProvas.length) {
            let provaEscolhida = todasProvas[numeroOpcao - 1];
            console.log(`\nEditando ${provaEscolhida.nome} do ${aluno.notas[provaEscolhida.modulo].nome}`);
            console.log(`Nota atual: ${formatarNota(provaEscolhida.nota)}`);
            
            let novaNota = prompt('Digite a nova nota (0-10, use vírgula para decimais):');
            novaNota = converterNota(novaNota);

            if (!isNaN(novaNota) && novaNota >= 0 && novaNota <= 10) {
                aluno.notas[provaEscolhida.modulo].provas[provaEscolhida.index].nota = novaNota;
                console.log('Nota atualizada com sucesso!');
                
                // Calcular e mostrar nova média
                let media = calcularMedia(aluno.notas[provaEscolhida.modulo].provas);
                console.log(`Nova média do módulo: ${formatarNota(media)}`);
                let status = media >= 6 ? 'APROVADO' : 'REPROVADO';
                let cor = media >= 6 ? '\x1b[32m' : '\x1b[31m';
                console.log(`Status: ${cor}${status}\x1b[0m`);
            } else {
                console.log('Nota inválida! A nota deve estar entre 0 e 10.');
            }
            prompt('Pressione Enter para continuar...');
        } else {
            console.log('Opção inválida!');
            prompt('Pressione Enter para continuar...');
        }
    }
}

// Função para gerenciar datas das provas
function gerenciarDatasProvas() {
    while (true) {
        console.clear();
        console.log('=== GERENCIAR DATAS DAS PROVAS ===\n');
        console.log('Escolha a turma:');
        console.log('1 - Turma A - Manhã (Módulo Básico)');
        console.log('2 - Turma B - Noite (Módulo Avançado)');
        console.log('3 - Voltar ao menu principal');

        let opcaoTurma = prompt('Escolha uma opção:');

        if (opcaoTurma === '3') {
            menuProfessor();
            return;
        }

        let moduloSelecionado;
        let nomeTurma;
        
        switch(opcaoTurma) {
            case '1':
                moduloSelecionado = 'modulo1';
                nomeTurma = 'Turma A - Manhã';
                break;
            case '2':
                moduloSelecionado = 'modulo2';
                nomeTurma = 'Turma B - Noite';
                break;
            default:
                console.log('Opção inválida!');
                prompt('Pressione Enter para continuar...');
                continue;
        }

        while (true) {
            console.clear();
            console.log(`=== DATAS DAS PROVAS - ${nomeTurma} ===\n`);
            console.log(`${modulosIngles[moduloSelecionado].nome}:`);
            
            modulosIngles[moduloSelecionado].provas.forEach((prova, index) => {
                console.log(`${index + 1}. ${prova.nome}: ${prova.data}`);
            });

            console.log('\nEscolha uma opção:');
            console.log('1 a 3 - Selecionar prova para definir data');
            console.log('4 - Voltar para seleção de turma');

            let opcaoProva = prompt('Digite sua escolha:');
            let numeroProva = parseInt(opcaoProva);

            if (opcaoProva === '4') {
                break;
            }

            if (numeroProva >= 1 && numeroProva <= 3) {
                console.log(`\nDefinindo data para ${modulosIngles[moduloSelecionado].provas[numeroProva-1].nome}`);
                console.log('Digite a data no formato DD/MM/YYYY:');
                let novaData = prompt('Data:');

                // Validação simples do formato da data
                if (/^\d{2}\/\d{2}\/\d{4}$/.test(novaData)) {
                    modulosIngles[moduloSelecionado].provas[numeroProva-1].data = novaData;
                    
                    // Atualizar a data para todos os alunos desta turma
                    alunos.forEach(aluno => {
                        if (aluno.turma === (opcaoTurma === '1' ? 'turmaA' : 'turmaB')) {
                            aluno.notas[moduloSelecionado].provas[numeroProva-1].data = novaData;
                        }
                    });

                    console.log('Data atualizada com sucesso!');
                } else {
                    console.log('Formato de data inválido! Use DD/MM/YYYY');
                }
                prompt('Pressione Enter para continuar...');
            } else {
                console.log('Opção inválida!');
                prompt('Pressione Enter para continuar...');
            }
        }
    }
}

// Função para iniciar o sistema
function iniciarSistema() {
    console.clear();
    menuInicial();
} 