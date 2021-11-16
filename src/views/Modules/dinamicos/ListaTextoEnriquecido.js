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

const ListaTextoEnriquecido = {
    id_type_module:20,
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
             },
    items:{
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
                label: 'URL enlace',
                fullWidth: true
              },
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            },
            icono: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                label: 'icono',
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
          archivo:false,
          htmlText:true


    },         
    archivo:false,
    htmlText:false,
    htmlEditorText:false


}

export { ListaTextoEnriquecido }

