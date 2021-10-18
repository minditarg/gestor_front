import moment from 'moment';

export const StateListConsultas = {
    consultas: [],
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

export const StateEditConsulta = {
    idPaciente: null,
    editConsultaForm: {
        temperatura: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Temperatura (ºC)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        peso: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Peso (Kg)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        // consulta: {
        //     elementType: 'textarea',
        //     elementConfig: {
        //         type: 'text',
        //         label: 'Consulta',
        //         fullWidth: true,
        //         rows: 4
        //     },
        //     value: '',
        //     validation: {
        //         required: false
        //     },
        //     valid: false,
        //     touched: false
        // },
        id_sensorio: {
            elementType: 'select',
            elementConfig: {
                label: 'Sensorio',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        id_mucosa: {
            elementType: 'select',
            elementConfig: {
                label: 'Color de las Mucosas',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        tllc: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Tiempo de Llenado Capilar (sg)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        frecuencia_cardiaca: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Frecuencia Cardíaca',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        frecuencia_respiratoria: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Frecuencia Respiratoria',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        ganglios: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Ganglios',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        anexos_cutaneos: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Anexos Cutáneos',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }
    },
    editConsultaForm2: {
        id_servicio: {
            elementType: 'select',
            elementConfig: {
                label: 'Servicio',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: true,
            touched: true
        }
    },
    editConsultaForm3: {
        id_signos: {
            elementType: 'select',
            elementConfig: {
                label: 'Motivo de Consulta',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        anamnesis: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Anamnesis',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }   
    },
    editConsultaForm4: {
        examen_objetivo_particular: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Examen Objetivo Particular',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }, 
        diag_complementarios: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Diagnóstico Complementarios',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        id_diag_presuntivo: {
            elementType: 'select',
            elementConfig: {
                label: 'Diagnóstico Presuntivo',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        tratamiento: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Tratamiento',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        id_pronostico: {
            elementType: 'select',
            elementConfig: {
                label: 'Pronóstico',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        id_diag_definitivo: {
            elementType: 'select',
            elementConfig: {
                label: 'Diagnóstico Definitivo',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }, 
    },
    editConsultaForm5:{
        informe_diagnostico: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Informe Diagnóstico',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }, 
        observaciones: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Observaciones',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
    },
    servicioClinica: null,
    files: [],
    url_archivo:null,
    openDeleteArchivo:false,
    fecha:null,
    consultaEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}



export const StateNewConsulta = {
    idPaciente: null,
    newConsultaForm: {
        temperatura: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Temperatura (ºC)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        peso: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Peso (Kg)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        // consulta: {
        //     elementType: 'textarea',
        //     elementConfig: {
        //         type: 'text',
        //         label: 'Consulta',
        //         fullWidth: true,
        //         rows: 4
        //     },
        //     value: '',
        //     validation: {
        //         required: false
        //     },
        //     valid: false,
        //     touched: false
        // },
        id_sensorio: {
            elementType: 'select',
            elementConfig: {
                label: 'Sensorio',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        id_mucosa: {
            elementType: 'select',
            elementConfig: {
                label: 'Color de las Mucosas',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        tllc: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Tiempo de Llenado Capilar (seg)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        frecuencia_cardiaca: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Frecuencia Cardíaca',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        frecuencia_respiratoria: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Frecuencia Respiratoria',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        ganglios: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Ganglios',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        anexos_cutaneos: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Anexos Cutáneos',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }  
    },
    newConsultaForm2: {
        id_servicio: {
            elementType: 'select',
            elementConfig: {
                label: 'Servicio',
                options: [
                ],
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
    newConsultaForm3: {
        id_signos: {
            elementType: 'select',
            elementConfig: {
                label: 'Motivo de Consulta',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        anamnesis: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Anamnesis',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }   
    },
    newConsultaForm4: {
        examen_objetivo_particular: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Examen Objetivo Particular',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }, 
        diag_complementarios: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Diagnóstico Complementarios',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        id_diag_presuntivo: {
            elementType: 'select',
            elementConfig: {
                label: 'Diagnóstico Presuntivo',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        tratamiento: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Tratamiento',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        id_pronostico: {
            elementType: 'select',
            elementConfig: {
                label: 'Pronóstico',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
        id_diag_definitivo: {
            elementType: 'select',
            elementConfig: {
                label: 'Diagnóstico Definitivo',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
    },
    newConsultaForm5: {
        informe_diagnostico: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Informe Diagnóstico',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }, 
        observaciones: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Observaciones',
                fullWidth: true,
                rows: 4
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        },
    },
    servicioClinica: null,
    files: [],
    archivo_subido:null,
    url_archivo:null,
    openDeleteArchivo:false,
    fecha:null,
    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}


export const ColumnsListado = [
{ title: "Fecha", field: "fecha_mostrar" , customSort: (a, b) => parseInt(moment(a.inicio_licencia).format("YYYYMMDD")) - parseInt(moment(b.inicio_licencia).format("YYYYMMDD"))},
{ title: "Servicio", field: "nombreservicio" },
{ title: "Paciente", field: "nombrepaciente" },
{ title: "Dueño", field: "nombredueno" },
{ title: "Peso (Kg)", field: "peso" },
{ title: "Motivo de Consulta", field: "nombresigno" },
{ title: "Diagnóstico Presuntivo", field: "nombrepatologia" },
{ title: "Diagnóstico Definitivo", field: "nombredefinitivo" }
];
