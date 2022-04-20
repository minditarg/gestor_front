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
    id_type_module:16,
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

          },
          archivo: false,
          htmlText: true

    },
    archivo:false,
    htmlText:false,
    htmlEditorText:false


}

export { ListaDesplegable }


