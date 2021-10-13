import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Database from "variables/Database.js";
import { toast } from 'react-toastify';


const _getSelectedOptionIndex = (el) => {
    let attribute = null;
    if (el.tagName === 'LI' && el.hasAttribute('data-option-index')){
        attribute = el.getAttribute('data-option-index');
    }
    return attribute
}

class SelectorClase extends Component {
    state = {data:[], 
             selected_data: null}

    getData = (el) => { 
        let state_index = null;
        let data = null;
        state_index = _getSelectedOptionIndex(el);
        if (state_index != null)  {
            data = this.state.data[state_index];
        }
        this.setState({selected_data:data})
        return data
    }

    componentDidMount() { 
        Database.get('/list-clase', this)
            .then(res => {
                let resultado = [...res.result];
                let data = resultado;
                this.setState({data:data})
            }, err => {
                toast.error(err.message);
            })
    }

    render () {
        
        return(
        <Autocomplete
            id="combo-box-clases"
            options={this.state.data}
            getOptionLabel={(data) => `${data.descripcion}` }
            onInputChange={(p) => this.props.getDataSelectedData(this.getData(p.target))}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} 
                                                label="Seleccionar una clase" 
                                                variant="outlined"/>}
                                                >
        </Autocomplete>
        )
    }
}

export default SelectorClase;