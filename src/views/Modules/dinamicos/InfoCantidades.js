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

const InfoCantidades = {
    id_type_module:9,
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
            cantidad: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                label: 'Cantidad',
                fullWidth: true
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

export { InfoCantidades }