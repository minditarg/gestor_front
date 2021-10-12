export const StateListEspecies = {
    especies: [],
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

export const StateEditEspecie = {

    editEspecieForm: {
        id_clase: {
            elementType: 'select',
            elementConfig: {
                label: 'Clase',
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
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Especie',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        } 
    },
    especieEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}



export const StateNewEspecie = {

    newEspecieForm: {
        id_clase: {
            elementType: 'select',
            elementConfig: {
                label: 'Clase',
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
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Especie',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        } 
    },

    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}


export const ColumnsListado = [
{ title: "Clase", field: "nombreclase" },
{ title: "Especie", field: "descripcion" }
];
