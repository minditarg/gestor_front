import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Database from "variables/Database.js";
import { toast } from 'react-toastify';


const _getSelectedOptionIndex = (el) => {
    let attribute = null;
    if (el.tagName === 'LI' && el.hasAttribute('data-option-index')) {
        attribute = el.getAttribute('data-option-index');
    }
    return attribute
}

class SelectorRaza extends Component {
    state = {
        data: [],
        selected_data: null,
        inputValue: ""
    }

    getData = (el) => {
        let state_index = null;
        let data = null;
        state_index = _getSelectedOptionIndex(el);
        if (state_index != null) {
            data = this.state.data[state_index];
        }
        this.setState({ selected_data: data })
        return data
    }

    getRazas = (especie) => {
        Database.get('/list-razas_por_especie/' + especie, this)
            .then(res => {
                let resultado = [...res.result];
                // console.log(resultado);
                let data = resultado
                this.setState({ data: data })
            }, err => {
                toast.error(err.message);
            })
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        // console.log(prevProps.calle);
        // console.log(this.props.calle);
        if ((this.props.especie !== prevProps.especie) && (this.props.especie)) {
          this.props.resetvalue();
          this.getRazas(this.props.especie.id);
        }
      }

   

    render() {
        return (
            <Autocomplete
                id="combo-box-razas"
                options={this.state.data}
                disabled={this.props.disabled}
                
                getOptionLabel={(data) => `${data.descripcion}`}

                value={this.props.raza}

                inputValue={this.state.inputValue}

                onInputChange={(event, newInputValue) => {
                    this.setState({
                        inputValue : newInputValue
                    }) 
                }}

                onChange={(event, newInputValue) => {
                    // console.log(newInputValue);
                    this.props.getDataSelectedData(newInputValue);
                }}


                
               // onClick={this.getColumnas()}
              //  onInputChange={(p) => this.props.getDataSelectedData(this.getData(p.target))}

                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params}
                    label="Seleccionar una raza"
                    variant="outlined" />}
            >
            </Autocomplete>
        )
    }
}

export default SelectorRaza;