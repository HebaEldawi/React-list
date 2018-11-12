import 'babel-polyfill';
import React from 'react';
import menuData from "./Butcher's burger menu-2.json";
import { PanelGroup, Panel } from 'react-bootstrap';

export default class AddEditItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: menuData
        };

    }

    // Creating a new category in menu
    createNewCategory = event => {
        event.preventDefault();
        //create a unique key for each new category 
        var timestamp = (new Date()).getTime();
        //populate new category with name from form, id from timestamp
        let category = {
            id: timestamp,
            name: this.refs.categoryName.value,
            items: []
        }
        // update the state object
        this.state.menu.categories.push(category);
        // set the state
        this.setState({ menu: this.state.menu });
    }

    //Adding new item inside a category of index key
    onItemAdd = (catId, key, e) => {
        e.preventDefault();
        //create a unique key for each new category item
        let timestamp = (new Date()).getTime();
        let inputName = "itemName" + catId;
        let inputPrice = "itemPrice" + catId;
        let inputDesc = "itemDescription" + catId;
        let item = {
            id: timestamp,
            name: this.refs[inputName].value,
            description: this.refs[inputDesc].value,
            price: this.refs[inputPrice].value,
        }
        // add new item to state object
        this.state.menu.categories[key].items.push(item);

        // set the state
        this.setState({ menu: this.state.menu });
    }

    //Updating item of id inside a category of index categoryIndex
    onItemUpdate = (categoryIndex, catId, id, e) => {
        e.preventDefault();
        e.stopPropagation();
        //get index of item by its id
        var index = this.state.menu.categories[categoryIndex].items.findIndex(item => item.id === id);
        let inputName = "updateItemName" + catId + id;
        let inputPrice = "updateItemPrice" + catId + id;
        let inputDesc = "updateItemDescription" + catId + id;
        let item = {
            id: id,
            name: this.refs[inputName].value,
            description: this.refs[inputDesc].value,
            price: this.refs[inputPrice].value,
        }
        // replacing object inside state
        this.state.menu.categories[categoryIndex].items.splice(index, 1, item);

        // set the state
        this.setState({ menu: this.state.menu });
    }

    //Delete item of id inside a category of index categoryIndex
    onItemDelete = (categoryIndex, id, e) => {
        e.preventDefault();
        e.stopPropagation();
        //get index of item by its id   
        var index = this.state.menu.categories[categoryIndex].items.findIndex(item => item.id === id);
        // deleting object 
        this.state.menu.categories[categoryIndex].items.splice(index, 1);
        // set the state
        this.setState({ menu: this.state.menu });
    }

    render() {



        return (
            <div className="container-fluid">
                <section className="form-container form-inline">
                    <h4>Add Category</h4>
                    <input require="true" type="text" ref="categoryName" key="cat-name" placeholder="Category name" className="form-control" />
                    <button onClick={this.createNewCategory} className="btn btn-forms"> Create category</button>
                </section>
                <section className="menu-container">
                    <h3>Menu Data</h3>
                    <PanelGroup id="mainPanel" key="categorySections" accordion>

                        <div className="container-fluid" >
                            <ul className="list-group">
                                {
                                    Object.keys(this.state.menu.categories).map(function (key) {
                                        return (

                                            <Panel eventKey={this.state.menu.categories[key].id.toString()} key={this.state.menu.categories[key].id.toString()}>
                                                <Panel.Heading>
                                                    <Panel.Title toggle><div><i className="glyphicon glyphicon-align-justify"></i> <h4>{this.state.menu.categories[key].name}</h4></div></Panel.Title>
                                                </Panel.Heading>
                                                <Panel.Body collapsible>
                                                    <div className="row">
                                                        <div className="form-group col-md-3">
                                                            <label>Name*</label>
                                                            <label className="data-lbl"> {this.state.menu.categories[key].name}</label>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label>Description</label>
                                                            {this.state.menu.categories[key].description === "" || this.state.menu.categories[key].description === undefined ? <label className="empty-lbl">Empty</label> : <label className="data-lbl">{this.state.menu.categories[key].description}</label>}
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-md-12">Items</label>
                                                        <div className="form-group col-md-3">

                                                            <input require="true" type="text" ref={"itemName" + this.state.menu.categories[key].id} placeholder="Name" className="form-control" />
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <input require="true" type="text" ref={"itemPrice" + this.state.menu.categories[key].id} placeholder="Price" className="form-control" />
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <textarea placeholder="Description" ref={"itemDescription" + this.state.menu.categories[key].id} className="form-control" />
                                                        </div>
                                                        <button onClick={(e) => this.onItemAdd(this.state.menu.categories[key].id, key, e)} className=" btn btn-forms" >Create</button>
                                                    </div>

                                                    <PanelGroup className="row" id={this.state.menu.categories[key].id.toString()} accordion key={this.state.menu.categories[key].id.toString()}>
                                                        {
                                                            Object.keys(this.state.menu.categories[key].items).map(function (itemKey) {
                                                                return (
                                                                    <Panel eventKey={this.state.menu.categories[key].items[itemKey].id.toString()} key={this.state.menu.categories[key].items[itemKey].id.toString()}>
                                                                        <Panel.Heading>
                                                                            <Panel.Title toggle>
                                                                                <div><i className="glyphicon glyphicon-align-justify"></i> <h5>{this.state.menu.categories[key].items[itemKey].name}</h5>
                                                                                    <div className="panel-actions pull-right">
                                                                                        <button onClick={(e) => this.onItemDelete(key, this.state.menu.categories[key].items[itemKey].id, e)} className="btn btn-secondry">Delete</button>
                                                                                    </div></div>
                                                                            </Panel.Title>

                                                                        </Panel.Heading>
                                                                        <Panel.Body collapsible >

                                                                            <div className="item-view">
                                                                                <div className="form-group col-md-3">
                                                                                    <label>Name*</label>
                                                                                    <input require="true" type="text" defaultValue={this.state.menu.categories[key].items[itemKey].name} ref={"updateItemName" + this.state.menu.categories[key].id + this.state.menu.categories[key].items[itemKey].id} placeholder="Name" className="form-control" />
                                                                                </div>
                                                                                <div className="form-group col-md-3">
                                                                                    <label>Price</label>
                                                                                    <input require="true" type="text" defaultValue={this.state.menu.categories[key].items[itemKey].price} ref={"updateItemPrice" + this.state.menu.categories[key].id + this.state.menu.categories[key].items[itemKey].id} placeholder="Price" className="form-control" />
                                                                                </div>
                                                                                <div className="form-group col-md-6">
                                                                                    <label>Description</label>
                                                                                    <textarea placeholder="Description" defaultValue={this.state.menu.categories[key].items[itemKey].description} ref={"updateItemDescription" + this.state.menu.categories[key].id + this.state.menu.categories[key].items[itemKey].id} className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={(e) => this.onItemUpdate(key, this.state.menu.categories[key].id, this.state.menu.categories[key].items[itemKey].id, e)} className=" btn btn-primary pull-right" >Update</button>

                                                                        </Panel.Body>
                                                                    </Panel>
                                                                )
                                                            }.bind(this)
                                                            )
                                                        }



                                                    </PanelGroup>
                                                </Panel.Body>
                                            </Panel>
                                        )
                                    }.bind(this)
                                    )
                                }
                            </ul>
                        </div>
                    </PanelGroup>
                </section>

            </div>
        )

    }


}

