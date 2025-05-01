export interface EmpresaRegistroDto {

    nombre:string,
    apellido: string,
    email: string,
    password: string,
    fechaNacimiento: Date,
    telefono: string,
    username:string,

    pais:string,
    provincia:string,
    poblacion:string,
    calle:string,
    codigoPostal: string,

    fotoPerfil: string,
    cif?:string

}
