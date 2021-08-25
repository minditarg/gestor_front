export const StateListClientes = {
    clientes: [],
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

export const StateEditCliente = {

    editClienteForm: {
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
            touched: true
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
            touched: true
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
            touched: true
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
            valid: true,
            touched: true
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
                required: true
            },
            valid: false,
            touched: true
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
                required: true
            },
            valid: false,
            touched: true
        },    
        id_tipo_cliente: {
            elementType: 'select',
            elementConfig: {
                label: 'Tipo',
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
    },
    clienteEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}

export const StateNewCliente = {

    newClienteForm: {
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
            touched: true
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
            touched: true
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
            touched: true
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
            valid: true,
            touched: true
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
                required: true
            },
            valid: false,
            touched: true
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
                required: true
            },
            valid: false,
            touched: true
        },    
        id_tipo_cliente: {
            elementType: 'select',
            elementConfig: {
                label: 'Tipo',
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
    },

    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}

export const ColumnsListado = [
{ title: "Nombre", field: "nombre" },
{ title: "Apellido", field: "apellido" },
{ title: "DNI", field: "dni" },
{ title: "Teléfono", field: "telefono" },
{ title: "Dirección", field: "direccion" },
{ title: "Tipo", field: "tipocliente" },
{ title: "Mail", field: "mail" }
];
