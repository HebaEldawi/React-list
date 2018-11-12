import React from 'react';
import menuData from "./Butcher's burger menu-2.json";
import { PanelGroup, Panel } from 'react-bootstrap';

export default class Menu extends React.Component {

    render() {

        let menuItems = this.recursiveRenderChildren(menuData.categories);
        return (
            <div className="container-fluid">
                <h3>Butcher's Burger Menu</h3>
                <PanelGroup accordion id="menuPanel" >{menuItems}</PanelGroup>
            </div>
        );

    }

    /* Recursive function to loop through menu items and check for children */

    recursiveRenderChildren(children) {
        let that = this;
        /* checker to stop recurssion if no submenu items present*/
        if (children !== undefined || children > 0) {
            return children.map((child) =>
                (
                    <Panel key={child.id.toString()} eventKey={child.id.toString()}>
                        <Panel.Heading><i className="fa fa-times"></i>
                            <Panel.Title toggle><div><i className="glyphicon glyphicon-align-justify"></i> <h5>{child.name}</h5> <em className="pull-right">{child.price}</em></div></Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            {child.description}

                            <PanelGroup accordion id="subMenuPanel">
                                {that.recursiveRenderChildren(child.items)}
                            </PanelGroup>
                        </Panel.Body>
                    </Panel>
                )
            );

        }
    }
}
