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

const Videos = {
    id_type_module:18,
    orderForm:{
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
      url: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'URL del video',
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
    archivo:false,
    htmlText:true,
    htmlEditorText:false


}

export { Videos }

