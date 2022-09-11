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

const Indice = {
    id_type_module:23,
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
            href: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                label: 'Enlace',
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
          htmlText: false

    },
    archivo:false,
    htmlText:false,
    htmlEditorText:false


}

export { Indice }


