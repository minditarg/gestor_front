import React, { Component } from 'react';
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Database from "variables/Database.js";
import { toast,ToastContainer } from 'react-toastify';
import moment from "moment";


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import BackupIcon from '@material-ui/icons/Backup';
import Files from 'react-files'

import TextField from '@material-ui/core/TextField';
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

import { StateEditConsulta } from "../VariablesState";



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


class EditConsulta extends Component {
  state = JSON.parse(JSON.stringify(StateEditConsulta));

  handleClickOpen = () => {
    this.setState({
      openChangePass:true
    })
  };

  handleClose = () => {
    this.setState({
      openChangePass:false
    })
  };




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


  getConsultaEdit = (id) => {
    Database.get('/list-consultas/' + id)
      .then(resultado => {
          console.log(resultado.result[0]);
          console.log(this.state.editConsultaForm);
          if (resultado.result[0].id_servicio == 1) {
            this.state.servicioClinica = true;
          }
          
          if (resultado.result.length > 0) {
            this.setState({
              consultaEdit: resultado.result[0]
            })

            let editConsultaFormAlt = { ...this.state.editConsultaForm };
            //editConsultaFormAlt.consulta.value = resultado.result[0].consulta;
            editConsultaFormAlt.temperatura.value = resultado.result[0].temperatura;
            editConsultaFormAlt.peso.value = resultado.result[0].peso;
            editConsultaFormAlt.id_sensorio.value = resultado.result[0].id_sensorio;
            editConsultaFormAlt.id_mucosa.value = resultado.result[0].id_mucosa;
            editConsultaFormAlt.tllc.value = resultado.result[0].tllc;
            editConsultaFormAlt.frecuencia_cardiaca.value = resultado.result[0].frecuencia_cardiaca;
            editConsultaFormAlt.frecuencia_respiratoria.value = resultado.result[0].frecuencia_respiratoria;
            editConsultaFormAlt.ganglios.value = resultado.result[0].ganglios;
            editConsultaFormAlt.anexos_cutaneos.value = resultado.result[0].anexos_cutaneos;
            let editConsultaFormAlt2 = { ...this.state.editConsultaForm2 };
            editConsultaFormAlt2.id_servicio.value = resultado.result[0].id_servicio;
            let editConsultaFormAlt3 = { ...this.state.editConsultaForm3 };
            editConsultaFormAlt3.id_signos.value = resultado.result[0].id_signos;
            editConsultaFormAlt3.anamnesis.value = resultado.result[0].anamnesis;
            let editConsultaFormAlt4 = { ...this.state.editConsultaForm4 };
            editConsultaFormAlt4.examen_objetivo_particular.value = resultado.result[0].examen_objetivo_particular;
            editConsultaFormAlt4.diag_complementarios.value = resultado.result[0].diag_complementarios;
            editConsultaFormAlt4.id_diag_presuntivo.value = resultado.result[0].id_diag_presuntivo;
            editConsultaFormAlt4.tratamiento.value = resultado.result[0].tratamiento;
            editConsultaFormAlt4.id_pronostico.value = resultado.result[0].id_pronostico;
            editConsultaFormAlt4.id_diag_definitivo.value = resultado.result[0].id_diag_definitivo;
            let editConsultaFormAlt5 = { ...this.state.editConsultaForm5 };
            editConsultaFormAlt5.informe_diagnostico.value = resultado.result[0].informe_diagnostico;
            editConsultaFormAlt5.observaciones.value = resultado.result[0].observaciones;
            for (let key in editConsultaFormAlt) {
              editConsultaFormAlt[key].touched = true;
              editConsultaFormAlt[key].valid = true;
            }

            this.setState({
              editConsultaForm: editConsultaFormAlt,
              editConsultaForm2: editConsultaFormAlt2,
              editConsultaForm3: editConsultaFormAlt3,
              editConsultaForm4: editConsultaFormAlt4,
              editConsultaForm5: editConsultaFormAlt5,
              fecha: resultado.result[0].fecha,
              url_archivo: resultado.result[0].archivo
            })
           // this.getConsultasType("edit", editConsultaFormAlt);
          }
          else {
            this.setState({
              consultaEdit: null
            })
          }

      })
  }


  handleSubmitEditConsulta = (event) => {

    event.preventDefault();

    let fecha = null;

    if (this.state.fecha != null)
    fecha = moment(this.state.fecha).format("YYYY-MM-DD HH:mm");

    Database.post(`/update-consulta`, { id: this.props.match.params.idconsulta, 
                                        id_servicio: this.state.editConsultaForm2.id_servicio.value,
                                        temperatura: this.state.editConsultaForm.temperatura.value,
                                        peso: this.state.editConsultaForm.peso.value,
                                        id_sensorio: this.state.editConsultaForm.id_sensorio.value,
                                        id_mucosa: this.state.editConsultaForm.id_mucosa.value,
                                        tllc: this.state.editConsultaForm.tllc.value,
                                        frecuencia_cardiaca: this.state.editConsultaForm.frecuencia_cardiaca.value,
                                        frecuencia_respiratoria: this.state.editConsultaForm.frecuencia_respiratoria.value,
                                        ganglios: this.state.editConsultaForm.ganglios.value,
                                        anexos_cutaneos: this.state.editConsultaForm.anexos_cutaneos.value,
                                        //consulta: this.state.editConsultaForm.consulta.value,
                                        id_signos: this.state.editConsultaForm3.id_signos.value,
                                        anamnesis: this.state.editConsultaForm3.anamnesis.value,
                                        examen_objetivo_particular: this.state.editConsultaForm4.examen_objetivo_particular.value,
                                        diag_complementarios: this.state.editConsultaForm4.diag_complementarios.value,
                                        id_diag_presuntivo: this.state.editConsultaForm4.id_diag_presuntivo.value,
                                        tratamiento: this.state.editConsultaForm4.tratamiento.value,
                                        id_pronostico: this.state.editConsultaForm4.id_pronostico.value,
                                        id_diag_definitivo: this.state.editConsultaForm4.id_diag_definitivo.value,
                                        informe_diagnostico: this.state.editConsultaForm5.informe_diagnostico.value,
                                        observaciones: this.state.editConsultaForm5.observaciones.value,
                                        fecha: fecha},this)
      .then(res => {

          this.setState({
            successSubmitEdit: true,
            editFormIsValid: false,
            disableAllButtons:false
          },()=>{
              toast.success("La consulta se ha modificado con exito!");

              this.props.getConsultasAdmin();

          })

      },err =>{
          toast.error(err.message);

      })

  }


  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editConsultaForm
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
      editConsultaForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }

  inputEditChangedHandler2 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editConsultaForm2
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
    if (inputIdentifier == "id_servicio")
    {
      if(event.target.value == 1)
      {
        this.setState({
          editConsultaForm2: updatedOrderForm,
          editFormIsValid: formIsValidAlt,
          servicioClinica: true
        })
      }
      else 
      {
        this.setState({
          editConsultaForm2: updatedOrderForm,
          editFormIsValid: formIsValidAlt,
          servicioClinica: null
        })
      }
    } 
    else 
    {
      this.setState({
        editConsultaForm2: updatedOrderForm,
        editFormIsValid: formIsValidAlt
      })
    }

  }

  inputEditChangedHandler3 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editConsultaForm3
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
      editConsultaForm3: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }

  inputEditChangedHandler4 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editConsultaForm4
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
      editConsultaForm4: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }

  inputEditChangedHandler5 = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editConsultaForm5
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
      editConsultaForm5: updatedOrderForm,
      editFormIsValid: formIsValidAlt
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

    Database.post('/insert-archivo-consulta/' + id + "/" + files[0].name, formData, this, false, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

      .then(res => {
        // setIsLoading(false);
        toast.success("El archivo " + files[0].name + " se ha subido con exito!");
        // callback.bind(this)(file_name);
        console.log(res);

      }, err => {
        //    setIsLoading(false);
        toast.error(err.message)

      })

  }

  onFilesArchivoError = (error, file) => {
    toast.warn('Error al subir el archivo ' + error.code + ': ' + error.message);
    console.log('error code ' + error.code + ': ' + error.message)
  }


  resetEditForm = () => {
    let editConsultaFormAlt = { ...this.state.editConsultaForm };
    let successSubmitEdit = this.state.successSubmitEdit;
    for (let key in editConsultaFormAlt) {
      editConsultaFormAlt[key].value = ''
    }

    this.setState({
      editFormIsValid: false,
      successSubmitEdit: successSubmitEdit
    })


  }

  getServicio = () => {
    Database.get('/list-servicio', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.codigo + " - " + entry.descripcion
          });
        })
        let formulario = { ...this.state.editConsultaForm2 }
        formulario.id_servicio.elementConfig.options = [...a];
        this.setState({
            editConsultaForm2: formulario
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
        let formulario = { ...this.state.editConsultaForm3 }
        formulario.id_signos.elementConfig.options = [...a];
        this.setState({
            editConsultaForm3: formulario
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
        let formulario = { ...this.state.editConsultaForm }
        formulario.id_sensorio.elementConfig.options = [...a];
        this.setState({
            editConsultaForm: formulario
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
        let formulario = { ...this.state.editConsultaForm }
        formulario.id_mucosa.elementConfig.options = [...a];
        this.setState({
            editConsultaForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getDiagPresuntivo = (idConsulta) => {
    Database.get('/list-patologia-consulta/'+ idConsulta, this)
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
        let formulario = { ...this.state.editConsultaForm4 }
        formulario.id_diag_presuntivo.elementConfig.options = [...a];
        this.setState({
            editConsultaForm4: formulario
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
        let formulario = { ...this.state.editConsultaForm4 }
        formulario.id_pronostico.elementConfig.options = [...a];
        this.setState({
            editConsultaForm4: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getDiagDefinitivo = (idConsulta) => {
    console.log(idConsulta);
    Database.get('/list-patologia-consulta/'+ idConsulta, this)
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
        let formulario = { ...this.state.editConsultaForm4 }
        formulario.id_diag_definitivo.elementConfig.options = [...a];
        this.setState({
            editConsultaForm4: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  componentDidMount() {

    this.getServicio();
    this.getSigno();
    this.getSensorio();
    this.getMucosa();
    this.getDiagPresuntivo(this.props.match.params.idconsulta);
    this.getPronostico();
    this.getDiagDefinitivo(this.props.match.params.idconsulta);
    this.getConsultaEdit(this.props.match.params.idconsulta);
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
    for (let key in this.state.editConsultaForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editConsultaForm[key]
      });
    }
    const formElementsArray2 = [];
    for (let key in this.state.editConsultaForm2) {
      formElementsArray2.push({
        id: key,
        config: this.state.editConsultaForm2[key]
      });
    }
    const formElementsArray3 = [];
    for (let key in this.state.editConsultaForm3) {
      formElementsArray3.push({
        id: key,
        config: this.state.editConsultaForm3[key]
      });
    }
    const formElementsArray4 = [];
    for (let key in this.state.editConsultaForm4) {
      formElementsArray4.push({
        id: key,
        config: this.state.editConsultaForm4[key]
      });
    }
    const formElementsArray5 = [];
    for (let key in this.state.editConsultaForm5) {
      formElementsArray5.push({
        id: key,
        config: this.state.editConsultaForm5[key]
      });
    }

    return ([

      <form onSubmit={(event) => {
        
        this.handleSubmitEditConsulta(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar Consulta</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario para modificar los datos de la consulta
      </p>
          </CardHeader>
          <CardBody>
          {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Cambiar Contraseña
      </Button> */}

            <div className="mt-3 mb-3">
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
                  changed={(event) => this.inputEditChangedHandler2(event, formElement.id)}
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
                  changed={(event) => this.inputEditChangedHandler3(event, formElement.id)}
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
                  changed={(event) => this.inputEditChangedHandler(event, formElement.id)}
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
                  changed={(event) => this.inputEditChangedHandler4(event, formElement.id)}
                  />
                ))}
                </div>
                :<div>
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
                    changed={(event) => this.inputEditChangedHandler5(event, formElement.id)}
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/consultas')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.editFormIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>,
      
      <Dialog open={this.state.openChangePass} onClose={this.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cambio de Contraseña</DialogTitle>
      <form onSubmit={(event) => {
        this.handleChangePass(event)

      } }>
      { this.state.openChangePass &&
      <DialogContent>
      
        <DialogContentText>
          Ingrese una nueva contraseña para el Consulta
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="contrasenia"
          name="contrasenia"
          label="nueva contraseña"
          type="password"
          fullWidth
        />
      </DialogContent>
      }
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          Aceptar
        </Button>
      </DialogActions>
      </form>
    </Dialog>
      


              ])
  }

};

export default withRouter(withStyles(styles)(EditConsulta));
