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
      console.log("ENTRO 1");
      console.log(this.state.archivo_subido);
      Database.post(`/insert-consultas`, {  idPaciente: this.state.idPaciente,
                                            id_servicio: this.state.newConsultaForm.id_servicio.value,
                                            temperatura: this.state.newConsultaForm.temperatura.value,
                                            peso: this.state.newConsultaForm.peso.value,
                                            consulta: this.state.newConsultaForm.consulta.value,
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
  
  
        },err => {
          toast.error(err.message);
  
        })

    }else 
    {
      console.log("ENTRO 2");
      console.log(this.state.archivo_subido);
      Database.post(`/insert-consultas-archivo-subido`, {  idPaciente: this.state.idPaciente,
                                            id_servicio: this.state.newConsultaForm.id_servicio.value,
                                            temperatura: this.state.newConsultaForm.temperatura.value,
                                            peso: this.state.newConsultaForm.peso.value,
                                            consulta: this.state.newConsultaForm.consulta.value,
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
        let formulario = { ...this.state.newConsultaForm }
        formulario.id_servicio.elementConfig.options = [...a];
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

        if (resultado.result.length > 0) {
          this.setState({
            nombrePaciente: resultado.result[0].nombre.toUpperCase(),
            idPaciente: id
          })
        }
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
    return (

      <form onSubmit={(event) => {
        this.handleSubmitNewConsulta(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Nueva Consulta</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario de alta de consulta
      </p>
          </CardHeader>
          <CardBody>

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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/consultas')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(NewConsulta));
