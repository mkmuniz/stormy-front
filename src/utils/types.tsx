/* Segue abaixo tipos para serem utilizados por todo o projeto
o intuito de se usar esses tipos é para ter um padrão de informações 
ao longo do projeto
*/

export const COOKIE_TYPES = Object.freeze({
    USUARIO: 'UID',
});

export const HTTP_STATUS_TYPES = Object.freeze({
    OK: 200,
    CRIADO: 201,
    NAO_ENCONTRADO: 404,
    NAO_AUTORIZADO: 401
})

/* TODO - Adicionar nos ids os HTTP_STATUS */
export const ERRO_TYPES = Object.freeze({
    /* 100 - 200 = Segurança */
    JWT_NAO_DEFINIDA: { erro: true, id: 100, msg: 'JWT não definida na variável de ambiente' },
    JWT_TEMPO_EXPIRADO: { erro: true, id: 101, msg: 'Tempo expirado' },
    JWT_NAO_AUTENTICADO: { erro: true, id: 401, msg: 'Não autenticado' },
    USUARIO_SENHA_INVALIDO: { erro: true, id: 103, msg: 'Usuário ou senha inválido' },
    /* HTTP */
    PAGINA_NAO_ENCONTRADA: { erro: true, id: 404, msg: 'Ops, página não encontrada' },
    /* OUTROS */
    GENERICO: { erro: true, id: 200, msg: 'Ops, Tivemos um problema. Recarregue ou volte mais tarde por favor.' }
});


/* Tudo que envolve o ciclo do login deve estar definido aqui */
export const LOGIN_TYPES = Object.freeze({
    OK: 0,
    LOGOUT: 1,
    /* erros */
    USUARIO_SENHA_INVALIDO: ERRO_TYPES.USUARIO_SENHA_INVALIDO.id,
    JWT_NAO_DEFINIDA: ERRO_TYPES.JWT_NAO_DEFINIDA.id,
    JWT_TEMPO_EXPIRADO: ERRO_TYPES.JWT_TEMPO_EXPIRADO.id,
    JWT_NAO_AUTENTICADO: ERRO_TYPES.JWT_NAO_AUTENTICADO.id,
    PAGINA_NAO_ENCONTRADA: ERRO_TYPES.PAGINA_NAO_ENCONTRADA.id,

});

/* Tipos iguais aos do back-end */
export const PERFIL_TYPES = Object.freeze({
    NENHUM: 0,
    PRESTADOR_SERVICO: 'supplier', /*  */
    CLIENTE: 'customer',
    ADMINISTRADOR: 'manager',
    ALUNO: 'aluno',
    PROFESSOR: 'professor'
})

/* tipos de informações salvas no $ - $=cache :) */
export const CACHE_TYPES = Object.freeze({
    SEMESTRE: 'SEMESTRE',
})

/* tipos relacionados aos alertas(toast) */
export const ALERTA_TYPES = Object.freeze({
    ERRO: -1,
    CADASTRAR: 0,
    ALTERAR: 1,
    EXCLUIR: 2
})


/* status de uma avaliação */
export const AVALIACAO_TYPES = Object.freeze({
    CANCELADO: -1,
    ABERTO: 0,
    RESPONDIDO: 1,
})

export const FORM_TYPES = Object.freeze({
    PRESTADOR_SERVICO: "Diagnóstico do Prestador de Serviços Contábeis",
    CLIENTE: "Diagnóstico do Contratante de Serviços Contábeis",
})