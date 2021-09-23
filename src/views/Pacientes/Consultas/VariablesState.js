import moment from 'moment';

export const StateListConsultas = {
    consultas: [],
    offset:0,
    checked: [],
    menuContext: null,
    botonesAcciones: {
        nuevo: {

            enabled: true,
            texto: 'Nuevo'
        },
        editar: {

            enabled: false,
            texto: 'Editar'
        },
        delete: {

            enabled: false,
            texto: 'Eliminar'
        }
    },
    modalOpen: false,
    openDeleteDialog:false,
    deleteRowData:null,
    isLoading:false




}

export const StateEditConsulta = {
    idPaciente: null,
    editConsultaForm: {
        id_servicio: {
            elementType: 'select',
            elementConfig: {
                label: 'Servicio',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: true
        },
        temperatura: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Temperatura (ºC)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        peso: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Peso (Kg)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        consulta: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Consulta',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
    },
    files: [],
    url_archivo:null,
    openDeleteArchivo:false,
    fecha:null,
    consultaEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}



export const StateNewConsulta = {
    idPaciente: null,
    newConsultaForm: {
        id_servicio: {
            elementType: 'select',
            elementConfig: {
                label: 'Servicio',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: true
        },
        temperatura: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Temperatura (ºC)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        peso: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Peso (Kg)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        consulta: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Consulta',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },   
    },
    files: [],
    archivo_subido:null,
    url_archivo:null,
    openDeleteArchivo:false,
    fecha:null,
    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}


export const ColumnsListado = [
{ title: "Fecha", field: "fecha_mostrar" , customSort: (a, b) => parseInt(moment(a.inicio_licencia).format("YYYYMMDD")) - parseInt(moment(b.inicio_licencia).format("YYYYMMDD"))},
{ title: "Servicio", field: "nombreservicio" },
{ title: "Paciente", field: "nombrepaciente" },
{ title: "Dueño", field: "nombredueno" },
{ title: "Temperatura (ºC)", field: "temperatura" },
{ title: "Peso (Kg)", field: "peso" },
{ title: "Diagnostico", field: "consulta" }
];
