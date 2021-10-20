export const StateListServicios = {
    servicios: [],
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

export const StateEditServicio = {

    editServicioForm: {
        codigo: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Código',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Servicio',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        tratamiento: {
            elementType: 'checkbox',
            elementConfig: {
                label: 'Tratamiento'
            },
            value: "0",
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        consulta: {
            elementType: 'checkbox',
            elementConfig: {
                label: 'Consulta'
            },
            value: "0",
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }
    },
    servicioEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}



export const StateNewServicio = {

    newServicioForm: {
        codigo: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Código',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Servicio',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        tratamiento: {
            elementType: 'checkbox',
            elementConfig: {
                label: 'Tratamiento'
            },
            value: "0",
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        consulta: {
            elementType: 'checkbox',
            elementConfig: {
                label: 'Consulta'
            },
            value: "0",
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }
    },

    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}


export const ColumnsListado = [
{ title: "Código", field: "codigo" },
{ title: "Servicio", field: "descripcion" }
];
