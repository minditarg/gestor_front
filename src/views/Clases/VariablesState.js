export const StateListClases = {
    clases: [],
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

export const StateEditClase = {

    editClaseForm: {
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Clase',
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
    claseEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}



export const StateNewClase = {

    newClaseForm: {
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Clase',
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
{ title: "Clase", field: "descripcion" }
];
