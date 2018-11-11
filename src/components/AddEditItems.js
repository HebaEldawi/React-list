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
        this.state.menu.categories['cat-' + timestamp] = category;
        // set the state
        this.setState({ menu: this.state.menu });
    }
    onItemAdd = (key, e) => {
        // e.preventDefault();
        //create a unique key for each new category item
        var timestamp = (new Date()).getTime();

        let item = {
            id: timestamp,
            name: "heba",
            description: "description",
            price: "520",
        }
        // update the state object

        this.state.menu.categories[key].items["item-" + timestamp] = item;

        // set the state
        this.setState({ menu: this.state.menu });
    }
    onItemUpdate = (categoryIndex,id, e) => {
         e.preventDefault();
        var index = this.state.menu.categories[categoryIndex].items.findIndex(item => item.id === id);

        let item = {
            id: id,
            name: "heba",
            description: "description",
            price: "520",
        }
        // update the state object

        this.state.menu.categories[categoryIndex].items.splice(index, 1,item);

        // set the state
        this.setState({ menu: this.state.menu });
    }

    onItemDelete = (categoryIndex, id, e) => {
        e.preventDefault();

        var index = this.state.menu.categories[categoryIndex].items.findIndex(item => item.id === id);
        // update the state object
        this.state.menu.categories[categoryIndex].items.splice(index, 1);
        // set the state
        this.setState({ menu: this.state.menu });
    }

    render() {



        return (
            <div>
                <header>
                    <h3>Add Category</h3>
                    <input require="true" type="text" ref="categoryName" key="cat-name" placeholder="Category name" />
                    <button onClick={this.createNewCategory}> Create category</button>
                </header>
                <section>
                    <h2>Menu Data</h2>
                    <PanelGroup id="mainPanel" key="cat-sections" accordion >
                        <MenuCategories items={this.state.menu.categories} onItemAdd={this.onItemAdd} onItemDelete={this.onItemDelete} onItemUpdate={this.onItemUpdate}  />
                    </PanelGroup>
                </section>

            </div>
        )

    }


}


export class MenuCategories extends React.Component {



    render() {
        return (
            <div className="container-fluid">
                <ul className="list-group">
                    {
                        Object.keys(this.props.items).map(function (key) {
                            return (

                                <Panel eventKey={this.props.items[key].id.toString()} key={this.props.items[key].id.toString()}>
                                    <Panel.Heading><i className="fa fa-times"></i>
                                        <Panel.Title toggle>{this.props.items[key].name}</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>

                                        <label>Name*</label>{this.props.items[key].name}

                                        <label>Items</label>
                                        <input require="true" type="text" ref="itemName" type="text" placeholder="Name" />
                                        <input require="true" type="text" ref="itemPrice" placeholder="Price" />
                                        <textarea placeholder="Description" ref="itemDescription" />
                                        <button onClick={(e) => this.props.onItemAdd(key, e)} >Create</button>

                                        <PanelGroup id={this.props.items[key].id.toString()} accordion key={this.props.items[key].id.toString()}>
                                            <CategoryItems items={this.props.items[key].items} categoryIndex={key} onItemDelete={this.props.onItemDelete} onItemUpdate={this.props.onItemUpdate} />

                                        </PanelGroup>
                                    </Panel.Body>
                                </Panel>
                            )
                        }.bind(this)
                        )
                    }
                </ul>
            </div>
        );
    }

}

export class CategoryItems extends React.Component {
    render() {
        return (
            Object.keys(this.props.items).map(function (key) {
                return (
                    <Panel eventKey={this.props.items[key].id.toString()} key={this.props.items[key].id.toString()}>
                        <Panel.Heading>
                            <Panel.Title toggle>{this.props.items[key].name}</Panel.Title>
                            <button onClick={(e) => this.props.onItemUpdate(this.props.categoryIndex, this.props.items[key].id, e)} >Edit</button>
                            <button onClick={(e) => this.props.onItemDelete(this.props.categoryIndex, this.props.items[key].id, e)}>Delete</button>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <label>Name*</label>{this.props.items[key].name}
                            <label>Price</label>{this.props.items[key].price}
                            <label>Description</label>{this.props.items[key].description}
                        </Panel.Body>
                    </Panel>
                )
            }.bind(this)
            )
        )
    }
}

