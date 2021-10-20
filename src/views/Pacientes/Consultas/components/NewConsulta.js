import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { StateNewConsulta } from "../VariablesState";
import moment from "moment";

import Database from "variables/Database.js";

import { toast } from 'react-toastify';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import BackupIcon from '@material-ui/icons/Backup';
import Files from 'react-files'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


class NewConsulta extends Component {
  state =JSON.parse(JSON.stringify(StateNewConsulta));


  handleSubmitNewConsulta = (event) => {
    event.preventDefault();

    let fecha = null;

    if (this.state.fecha != null)
    fecha = moment(this.state.fecha).format("YYYY-MM-DD HH:mm");

    if (this.state.archivo_subido == null)
    {
      Database.post(`/insert-consultas`, {  idPaciente: this.state.idPaciente,
                                            id_servicio: this.state.newConsultaForm2.id_servicio.value,
                                            temperatura: this.state.newConsultaForm.temperatura.value,
                                            peso: this.state.newConsultaForm.peso.value,
                                            id_sensorio: this.state.newConsultaForm.id_sensorio.value,
                                            id_mucosa: this.state.newConsultaForm.id_mucosa.value,
                                            tllc: this.state.newConsultaForm.tllc.value,
                                            frecuencia_cardiaca: this.state.newConsultaForm.frecuencia_cardiaca.value,
                                            frecuencia_respiratoria: this.state.newConsultaForm.frecuencia_respiratoria.value,
                                            ganglios: this.state.newConsultaForm.ganglios.value,
                                            anexos_cutaneos: this.state.newConsultaForm.anexos_cutaneos.value,
                                            //consulta: this.state.newConsultaForm.consulta.value,
                                            id_signos: this.state.newConsultaForm3.id_signos.value,
                                            anamnesis: this.state.newConsultaForm3.anamnesis.value,
                                            examen_objetivo_particular: this.state.newConsultaForm4.examen_objetivo_particular.value,
                                            diag_complementarios: this.state.newConsultaForm6.diag_complementarios.value,
                                            id_diag_presuntivo: this.state.newConsultaForm7.id_diag_presuntivo.value,
                                            tratamiento: this.state.newConsultaForm8.tratamiento.value,
                                            id_pronostico: this.state.newConsultaForm9.id_pronostico.value,
                                            id_diag_definitivo: this.state.newConsultaForm9.id_diag_definitivo.value,
                                            informe_diagnostico: this.state.newConsultaForm5.informe_diagnostico.value,
                                            observaciones: this.state.newConsultaForm5.observaciones.value,
                                            fecha: fecha},this)
        .then(res => {
  
            toast.success("La consulta se ha creado con exito!");
            this.setState({
              successSubmit: true,
              formIsValid: false,
            },()=>{
                //this.props.getConsultasAdmin();
            })
            this.resetNewForm();
            this.resetNewForm2();
            this.resetNewForm3();
            this.resetNewForm4();
            this.resetNewForm5();
            this.resetNewForm6();
            this.resetNewForm7();
            this.resetNewForm8();
            this.resetNewForm9();
  
  
        },err => {
          toast.error(err.message);
  
        })

    }else 
    {
      Database.post(`/insert-consultas-archivo-subido`, {  idPaciente: this.state.idPaciente,
                                            id_servicio: this.state.newConsultaForm2.id_servicio.value,
                                            temperatura: this.state.newConsultaForm.temperatura.value,
                                            peso: this.state.newConsultaForm.peso.value,
                                            id_sensorio: this.state.newConsultaForm.id_sensorio.value,
                                            id_mucosa: this.state.newConsultaForm.id_mucosa.value,
                                            tllc: this.state.newConsultaForm.tllc.value,
                                            frecuencia_cardiaca: this.state.newConsultaForm.frecuencia_cardiaca.value,
                                            frecuencia_respiratoria: this.state.newConsultaForm.frecuencia_respiratoria.value,
                                            ganglios: this.state.newConsultaForm.ganglios.value,
                                            anexos_cutaneos: this.state.newConsultaForm.anexos_cutaneos.value,
                                            //consulta: this.state.newConsultaForm.consulta.value,
                                            id_signos: this.state.newConsultaForm3.id_signos.value,
                                            anamnesis: this.state.newConsultaForm3.anamnesis.value,
                                            examen_objetivo_particular: this.state.newConsultaForm4.examen_objetivo_particular.value,
                                            diag_complementarios: this.state.newConsultaForm6.diag_complementarios.value,
                                            id_diag_presuntivo: this.state.newConsultaForm7.id_diag_presuntivo.value,
                                            tratamiento: this.state.newConsultaForm8.tratamiento.value,
                                            id_pronostico: this.state.newConsultaForm9.id_pronostico.value,
                                            id_diag_definitivo: this.state.newConsultaForm9.id_diag_definitivo.value,
                                            informe_diagnostico: this.state.newConsultaForm5.informe_diagnostico.value,
                                            observaciones: this.state.newConsultaForm5.observaciones.value,
                                            fecha: fecha},this)
        .then(res => {

            toast.success("La consulta se ha creado con exito!");
            this.setState({
            successSubmit: true,
            formIsValid: false,
            },()=>{
            //this.props.getConsultasAdmin();
            })
            this.resetNewForm();
            this.resetNewForm2();
            this.resetNewForm3();
            this.resetNewForm4();
            this.resetNewForm5();
            this.resetNewForm6();
            this.resetNewForm7();
            this.resetNewForm8();
            this.resetNewForm9();


        },err => {
        toast.error(err.message);

        })
    }
  }


  inputChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm
    };
    
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(this.state.archivo_subido);
    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    
    this.setState({
      newConsultaForm: updatedOrderForm,
      formIsValid: formIsValidAlt
    })
    
    /*this.setState({
      archivo_subido: true
    })*/
  }

  inputChangedHandler2 = (event, inputIdentifier, formElement) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm2
    };
    console.log("SERVICIO 1: " + updatedOrderForm.id_servicio.value);
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(this.state.archivo_subido);
    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    if (inputIdentifier == "id_servicio")
    {
      var option = formElement.config.elementConfig.options;
      for (let i =0; i < option.length;i++)
      {
        if (formElement.config.elementConfig.options[i].value === event.target.value)
        {
          var consulta = formElement.config.elementConfig.options[i].consulta;
          var tratamiento = formElement.config.elementConfig.options[i].tratamiento;
          break;
        }
      }
      //if(event.target.value == 1)
      /*if(consulta == 1)
      {
        this.setState({
          newConsultaForm2: updatedOrderForm,
          formIsValid: formIsValidAlt,
          servicioClinica: true
        })
      }
      else 
      {
        this.setState({
          newConsultaForm2: updatedOrderForm,
          formIsValid: formIsValidAlt,
          servicioClinica: null
        })
      }*/
      this.setState({
        newConsultaForm2: updatedOrderForm,
        formIsValid: formIsValidAlt,
        servicioClinica: consulta,
        servicioTratamiento: tratamiento
      })
    } 
    else 
    {
      this.setState({
        newConsultaForm2: updatedOrderForm,
        formIsValid: formIsValidAlt
      })
    }
    console.log("cambiando servicio: " + event.target.value);
    console.log("SERVICIO 2: " + updatedOrderForm.id_servicio.value);
    /*this.setState({
      archivo_subido: true
    })*/
  }

  inputChangedHandler3 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm3
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      newConsultaForm3: updatedOrderForm,
      formIsValid: formIsValidAlt
    })
  }

  inputChangedHandler4 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm4
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      newConsultaForm4: updatedOrderForm,
      formIsValid: formIsValidAlt
    })
  }

  inputChangedHandler5 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm5
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      newConsultaForm5: updatedOrderForm,
      formIsValid: formIsValidAlt
    })
  }

  inputChangedHandler6 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm6
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      newConsultaForm6: updatedOrderForm,
      formIsValid: formIsValidAlt
    })
  }

  inputChangedHandler7 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm7
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      newConsultaForm7: updatedOrderForm,
      formIsValid: formIsValidAlt
    })
  }

  inputChangedHandler8 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm8
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      newConsultaForm8: updatedOrderForm,
      formIsValid: formIsValidAlt
    })
  }

  inputChangedHandler9 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConsultaForm9
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      newConsultaForm9: updatedOrderForm,
      formIsValid: formIsValidAlt
    })
  }

  onFilesArchivoChange = (files) => {
    console.log(files)
    this.setState({
      files: files
    })
    console.log(this.state.files);
    const formData = new FormData();
    formData.append('archivo', files[0]);

    var id = this.props.match.params.idconsulta;//buscar id

    Database.post('/insert-archivo-new-consulta/' + id + "/" + files[0].name, formData, this, false, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

      .then(res => {
        // setIsLoading(false);
        toast.success("El archivo " + files[0].name + " se ha subido con exito!");
        // callback.bind(this)(file_name);
        console.log(res);
        this.setState({
          archivo_subido: true
        })

      }, err => {
        //    setIsLoading(false);
        toast.error(err.message)

      })

  }

  onFilesArchivoError = (error, file) => {
    toast.warn('Error al subir el archivo ' + error.code + ': ' + error.message);
    console.log('error code ' + error.code + ': ' + error.message)
  }

  resetNewForm = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
    //this.getConsultasType("new", newConsultaFormAlt);

  }

  resetNewForm2 = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm2 };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
  }

  resetNewForm3 = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm3 };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
  }

  resetNewForm4 = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm4 };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
  }

  resetNewForm5 = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm5 };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
  }

  resetNewForm6 = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm6 };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
  }

  resetNewForm7 = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm7 };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
  }

  resetNewForm8 = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm8 };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
  }

  resetNewForm9 = (all) => {
    let newConsultaFormAlt = { ...this.state.newConsultaForm9 };
    let successSubmit = this.state.successSubmit;
    for (let key in newConsultaFormAlt) {
      newConsultaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
  }

  getServicio = () => {
    Database.get('/list-servicio', this)
      .then(res => {
        
        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            consulta: entry.consulta,
            tratamiento: entry.tratamiento,
            value: entry.id,
            displayValue: entry.codigo + " - " + entry.descripcion
          });
        })
        let formulario = { ...this.state.newConsultaForm2 }
        formulario.id_servicio.elementConfig.options = [...a];
        this.setState({
            newConsultaForm2: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getSigno = () => {
    Database.get('/list-signo', this)
      .then(res => {
        
        let resultado = [...res.result];
        let a = [];
        a.push({
          value: "",
          displayValue: "Quitar"
        });
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newConsultaForm3 }
        formulario.id_signos.elementConfig.options = [...a];
        this.setState({
            newConsultaForm3: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getSensorio = () => {
    Database.get('/list-sensorio', this)
      .then(res => {
        
        let resultado = [...res.result];
        let a = [];
        a.push({
          value: "",
          displayValue: "Quitar"
        });
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newConsultaForm }
        formulario.id_sensorio.elementConfig.options = [...a];
        this.setState({
            newConsultaForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getMucosa = () => {
    Database.get('/list-mucosa', this)
      .then(res => {
        
        let resultado = [...res.result];
        let a = [];
        a.push({
          value: "",
          displayValue: "Quitar"
        });
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newConsultaForm }
        formulario.id_mucosa.elementConfig.options = [...a];
        this.setState({
            newConsultaForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getPaciente = (id) => {
    Database.get('/list-paciente/' + id)
      .then(resultado => {
        console.log(resultado);
        console.log("TESTING");
        console.log(this);
        if (resultado.result.length > 0) {
          this.setState({
            idEspecie: resultado.result[0][0].id_especie,
            nombrePaciente: resultado.result[0][0].nombre.toUpperCase(),
            nombreClase: resultado.result[0][0].nombreclase.toUpperCase(),
            nombreDueno: resultado.result[0][0].nombredueno.toUpperCase(),
            nombreEspecie: resultado.result[0][0].nombreespecie.toUpperCase(),
            nombreRaza: resultado.result[0][0].nombreraza.toUpperCase(),
            nombreSexo: resultado.result[0][0].nombresexo.toUpperCase(),
            idPaciente: id
          })
        }
      })
  }

  getDiagPresuntivo = (idEspecie) => {
    console.log(idEspecie);
    Database.get('/list-patologia/' + idEspecie, this)
      .then(res => {
        
        let resultado = [...res.result];
        let a = [];
        a.push({
          value: "",
          displayValue: "Quitar"
        });
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newConsultaForm7 }
        formulario.id_diag_presuntivo.elementConfig.options = [...a];
        this.setState({
            newConsultaForm7: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getPronostico = () => {
    Database.get('/list-pronostico', this)
      .then(res => {
        
        let resultado = [...res.result];
        let a = [];
        a.push({
          value: "",
          displayValue: "Quitar"
        });
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newConsultaForm9 }
        formulario.id_pronostico.elementConfig.options = [...a];
        this.setState({
            newConsultaForm9: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getDiagDefinitivo = (idEspecie) => {
    console.log(idEspecie);
    Database.get('/list-patologia/'+ idEspecie, this)
      .then(res => {
        
        let resultado = [...res.result];
        let a = [];
        a.push({
          value: "",
          displayValue: "Quitar"
        });
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newConsultaForm9 }
        formulario.id_diag_definitivo.elementConfig.options = [...a];
        this.setState({
            newConsultaForm9: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }





  checkValidity = (value, rules) => {
    let isValid = true;
    let textValid = null;

    if (rules.required && isValid) {
      isValid = value.toString().trim() !== '';
      textValid = 'El campo es requerido'
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
      textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
    }

    if (rules.maxLength && isValid) {
      isValid = value.length <= rules.maxLength;
      textValid = 'Supera el maximo de caracteres';
    }

    return { isValid: isValid, textValid: textValid };
  }

  componentDidMount() {

    this.getPaciente(this.props.match.params.id);
    this.getServicio();
    this.getSigno();
    this.getSensorio();
    this.getMucosa();
    this.getDiagPresuntivo(this.props.match.params.id);
    this.getPronostico();
    this.getDiagDefinitivo(this.props.match.params.id);
  }

  handleClickOpenArchivo = () => {
    this.setState({
      openDeleteArchivo: true
    })
  };

  handleCloseArchivo = () => {
    this.setState({
      openDeleteArchivo: false
    })
  };

  handleDeleteArchivo = (event) => {
    event.preventDefault();
    this.setState({
      openDeleteArchivo: false
    })

    Database.post(`/delete-archivo-consulta`, { id: this.props.match.params.idconsulta }, this)
      .then(res => {
        this.setState({
          successSubmitEdit: true,
          editFormIsValid: false,
          disableAllButtons: false
        }, () => {
          toast.success("El archivo se ha eliminado con exito!");

          //this.props.getEmpleadosAdmin();

        })
      }, err => {
        toast.error(err.message);

      })
  }

  handleFecha = (date) => {
    this.setState(
      {
        fecha: date
      }
    )
  };



  render() {

    const formElementsArray = [];
    for (let key in this.state.newConsultaForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newConsultaForm[key]
      });
    }
    const formElementsArray2 = [];
    for (let key in this.state.newConsultaForm2) {
      formElementsArray2.push({
        id: key,
        config: this.state.newConsultaForm2[key]
      });
    }
    const formElementsArray3 = [];
    for (let key in this.state.newConsultaForm3) {
      formElementsArray3.push({
        id: key,
        config: this.state.newConsultaForm3[key]
      });
    }
    const formElementsArray4 = [];
    for (let key in this.state.newConsultaForm4) {
      formElementsArray4.push({
        id: key,
        config: this.state.newConsultaForm4[key]
      });
    }
    const formElementsArray5 = [];
    for (let key in this.state.newConsultaForm5) {
      formElementsArray5.push({
        id: key,
        config: this.state.newConsultaForm5[key]
      });
    }
    const formElementsArray6 = [];
    for (let key in this.state.newConsultaForm6) {
      formElementsArray6.push({
        id: key,
        config: this.state.newConsultaForm6[key]
      });
    }
    const formElementsArray7 = [];
    for (let key in this.state.newConsultaForm7) {
      formElementsArray7.push({
        id: key,
        config: this.state.newConsultaForm7[key]
      });
    }
    const formElementsArray8 = [];
    for (let key in this.state.newConsultaForm8) {
      formElementsArray8.push({
        id: key,
        config: this.state.newConsultaForm8[key]
      });
    }
    const formElementsArray9 = [];
    for (let key in this.state.newConsultaForm9) {
      formElementsArray9.push({
        id: key,
        config: this.state.newConsultaForm9[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitNewConsulta(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Nueva Consulta</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario de alta de consulta del paciente: {this.state.nombrePaciente}
      </p>
          </CardHeader>
          <CardBody>

            <div className="mt-3 mb-3">

            {/* <br></br><br></br>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite}>Datos del Paciente: {this.state.nombrePaciente}</h4>

            </CardHeader> */}

               
            <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
              <div>
                  <KeyboardDatePicker
                    margin="normal"
                    id="fecha"
                    label="Fecha"
                    format="dd/MM/yyyy"
                    value={this.state.fecha}
                    onChange={this.handleFecha}
                    autoOk={true}
                    cancelLabel={"Cancelar"}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
              </div>
            </MuiPickersUtilsProvider>
            
            

              {formElementsArray2.map(formElement => (
                <Input
                  key={"editconsulta-" + formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  textValid={formElement.config.textValid}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event) => this.inputChangedHandler2(event, formElement.id, formElement)}
                  />
              ))}

              {this.state.servicioClinica ?
                <div>
                  
                  {formElementsArray3.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler3(event, formElement.id)}
                    />
                  ))}
                  <br></br><br></br>
                  <CardHeader color="primary">
                  <h4 className={this.props.classes.cardTitleWhite}>EXAMEN OBJETIVO GENERAL</h4>

                  </CardHeader>
                  <br></br>
                  
                  {formElementsArray.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                  ))}

                  <br></br><br></br>
                  <CardHeader color="primary">
                  <h4 className={this.props.classes.cardTitleWhite}>EXAMEN OBJETIVO PARTICULAR</h4>
                  </CardHeader>

                  {formElementsArray4.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler4(event, formElement.id)}
                    />
                  ))}
                  
                  <br></br><br></br>
                  <CardHeader color="primary">
                  <h4 className={this.props.classes.cardTitleWhite}>DIAGNÓSTICO COMPLEMENTARIO</h4>
                  </CardHeader>

                  {formElementsArray6.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler6(event, formElement.id)}
                    />
                  ))}

                  <br></br><br></br>
                  <CardHeader color="primary">
                  <h4 className={this.props.classes.cardTitleWhite}>DIAGNÓSTICO PRESUNTIVO</h4>
                  </CardHeader>

                  {formElementsArray7.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler7(event, formElement.id)}
                    />
                  ))}

                  <br></br><br></br>
                  <CardHeader color="primary">
                  <h4 className={this.props.classes.cardTitleWhite}>TRATAMIENTO</h4>
                  </CardHeader>

                  {formElementsArray8.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler8(event, formElement.id)}
                    />
                  ))}

                  <br></br><br></br>
                  <CardHeader color="primary">
                  <h4 className={this.props.classes.cardTitleWhite}>DIAGNÓSTICO DEFINITIVO</h4>
                  </CardHeader>

                  {formElementsArray9.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler9(event, formElement.id)}
                    />
                  ))}
                </div>
                : this.state.servicioTratamiento ? <div>
                
                {formElementsArray5.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler5(event, formElement.id)}
                    />
                  ))}

                <br></br><br></br>
                  <CardHeader color="primary">
                  <h4 className={this.props.classes.cardTitleWhite}>TRATAMIENTO</h4>
                  </CardHeader>
                
                {formElementsArray8.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler8(event, formElement.id)}
                    />
                  ))}</div>
                  :  <div>
                {formElementsArray5.map(formElement => (
                  <Input
                    key={"editconsulta-" + formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    textValid={formElement.config.textValid}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler5(event, formElement.id)}
                    />
                  ))}</div>}

              <div className="files">
                <Files
                  className='files-dropzone'
                  onChange={this.onFilesArchivoChange}
                  onError={this.onFilesArchivoError}
                  accepts={['image/png', '.pdf', 'audio/*', '.docx', '.doc', '.jpg']}
                  multiple
                  maxFiles={3}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                >
                  <Button style={{ marginTop: '25px' }} color="primary" variant="contained" ><BackupIcon />&nbsp; Adjuntar archivo</Button>
                </Files>
                </div>

                {this.state.url_archivo ?
                <div>
                <br></br>
                <a target="_blank" href={this.state.url_archivo}>ver archivo adjunto</a>
                <Button color="info" onClick={this.handleClickOpenArchivo} >Eliminar archivo</Button>
                </div>
                :null}

              <Dialog open={this.state.openDeleteArchivo} onClose={this.handleCloseArchivo} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Eliminar archivo</DialogTitle>
                <form onSubmit={(event) => {
                  this.handleDeleteArchivo(event)

                }}>
                  {this.state.openDeleteArchivo &&
                    <DialogContent>

                      <DialogContentText>
                        Esta seguro que desea eliminar el archivo subido?
                      </DialogContentText>
                    </DialogContent>
                  }
                  <DialogActions>
                    <Button onClick={this.handleCloseArchivo} color="primary">
                      Cancelar
                    </Button>
                    <Button type="submit" color="primary">
                      Aceptar
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/pacientes')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(NewConsulta));
