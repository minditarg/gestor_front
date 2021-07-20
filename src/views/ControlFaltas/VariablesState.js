export const StateListControlFaltas = {
    controlfaltas: [],
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

export const StateEditControlFalta = {

    editControlFaltaForm: {
        nombre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Nombre',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        apellido: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Apellido',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        dni: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'DNI',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        telefono: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Teléfono',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        direccion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Dirección',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        id_tipo_controlfalta: {
            elementType: 'select',
            elementConfig: {
                label: 'Tipo',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        mail: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Mail',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },    
    },
    controlfaltaEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}

export const StateNewControlFalta = {

    newControlFaltaForm: {
        id_empleado: {
            elementType: 'select',
            elementConfig: {
                label: 'Empleado',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        id_tipo_falta: {
            elementType: 'select',
            elementConfig: {
                label: 'Falta',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },  
    },

    fechaInicioLicencia:null,
    fechaFinLicencia:null,
    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}

export const ColumnsListado = [
{ title: "Empleado", field: "nombre_empleado" },
{ title: "Falta", field: "tipo_falta" },
{ title: "Inicio Licencia", field: "inicio_licencia_mostrar", customSort: (a, b) => parseInt(moment(a.inicio_licencia).format("YYYYMMDD")) - parseInt(moment(b.inicio_licencia).format("YYYYMMDD")) },
{ title: "Fin Licencia", field: "fin_licencia_mostrar", customSort: (a, b) => parseInt(moment(a.fin_licencia).format("YYYYMMDD")) - parseInt(moment(b.fin_licencia).format("YYYYMMDD")) }
];
