import React, { Component } from "react";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "https://api-rest-luis-r45f.vercel.app/products";
const styleBody = {
  backgroundColor: "#7A0244",
  color: "#fff",
  paddingTop: "5rem",
  paddingBottom: "5rem",
};

class CrudProductos extends Component {

  state = {
    data: [],
    modalInsert: false,
    modalEliminar: false,
    form: {
      id: "",
      name: "",
      description: "",
      price: "",
      tipoModal: "",
    }
  };

  peticionGet = () => {
    axios.get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.id;
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsert();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = () => {
    axios.put(url + this.state.form.id, this.state.form).then((response) => {
      this.modalInsert();
      this.peticionGet();
    });
  };

  peticionDelete = () => {
    axios.delete(url + this.state.form.id).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  modalInsert = () => {
    this.setState({ modalInsert: !this.state.modalInsert });
  };

  seleccionarProducto = (producto) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: producto.id,
        name: producto.name,
        description: producto.description,
        price: producto.price,
      },
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="container" style={styleBody}>
        <br />
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: null, tipoModal: 'insertar' });
            this.modalInsert();
          }}
        >
          Agregar producto
        </button>
        <br /> <br />
        <table className="table">
          <thead className="thead-dark">
            <tr>

              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(prod => {
              return (
                <tr>
                  <td>{prod.name}</td>
                  <td>{prod.description}</td>
                  <td>{prod.price}</td>
                  <td>
                    <button className="btn btn-primary" onClick={()=> {this.seleccionarProducto(prod); this.modalInsert()}}>Editar</button>
                    {" "}
                    <button className="btn btn-danger" onClick={()=> {this.seleccionarProducto(prod); this.setState({modalEliminar:true})}}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}} onClick={()=>this.modalInsert()}>x</span>
          </ModalHeader>

          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1} />
              <br />
              <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form._id: ''} />
              <br />
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" type="text" name="nombre" id="nombre"  onChange={this.handleChange} value={form?form.name: ''} />
              <br />
              <label htmlFor="descripcion">Descripcion</label>
              <input className="form-control" type="text" name="descripcion" id="descripcion"  onChange={this.handleChange} value={form?form.description: ''} />
              <br />
              <label htmlFor="precio">Precio</label>
              <input className="form-control" type="text" name="precio" id="precio"  onChange={this.handleChange} value={form?form.price: ''} />
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal='insertar' ?
            <button className="btn btn-success" onClick={()=>this.peticionPost()}>insertar
            </button>: <button className="btn btn-primary" onClick={()=> this.peticionPut()}>
              Actualizar
            </button>
  }
            <button className="btn btn-danger" onClick={()=> this.modalInsert()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estas seguro que deseas eliminar al producto { form && form.name}
          </ModalBody>
          <ModalFooter>
          <button className="btn btn-danger" onClick={()=> this.peticionDelete()}>Si</button>
            <button className="btn btn-secundary" onClick={()=> this.setState({modalEliminar: false})}>No</button>
          </ModalFooter>
        </Modal>


      </div>
    );
  }
}

export default CrudProductos;
