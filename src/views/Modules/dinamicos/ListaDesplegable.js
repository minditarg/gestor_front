const muestra = {
    orderForm:{},
    items:{
        orderForm:{

        },
        archivo:false,
        htmlText:true
    },
    archivo:false,
    htmlText:false,
    htmlEditorText:false



}

const ListaDesplegable = {
    id_type_module:3,
    items:{
        orderForm: {
            titulo: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                label: 'Titulo',
                fullWidth: true
              },
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            },
            texto: {
              elementType: 'textarea',
              elementConfig: {
                type: 'text',
                label: 'Texto',
                fullWidth: true,
                rows: 6
              },
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            }

          },
          archivo: false,
          htmlText: false

    },
    archivo:false,
    htmlText:false,
    htmlEditorText:false


}

export { ListaDesplegable }


