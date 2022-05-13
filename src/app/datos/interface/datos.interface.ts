export interface RespuestaAnuncio {
    cantidad:      number;
    region:        string;
    totalAnuncios: string;
    totalPaginas:  string;
    anuncios:      Anuncio[];
    departamentos: Departamento[];
}

export interface Anuncio
{
    enlace:           string;
    titulo:           string;
    empresa:          string;
    logoEmpresa:      string;
    fechaPublicacion: string;
    fechaVencimiento: string;
    ubicacion:        string;
    estado:           string;

    categoria?:        string;
    tipoContrato?:     string;
    fuente?:           string;
}

export interface Departamento
{
    value: string;
    text:  string;
}