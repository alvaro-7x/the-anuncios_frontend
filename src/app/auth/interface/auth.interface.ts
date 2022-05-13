export interface RespuestaAuth {
    estado:  boolean;
    usuario?: Usuario;
    token?:   string;
    msg?:   string;
}

export interface Usuario {
    email:       string;
    given_name:  string;
    family_name: string;
    picture:     string;
    time:        Date;
}

