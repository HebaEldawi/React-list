import React from 'react';
import menuData from "./Butcher's burger menu-2.json";
import { PanelGroup, Panel } from 'react-bootstrap';

export default class Menu extends React.Component {

    render() {

        let menuItems = this.recursiveRenderChildren(menuData.categories);
        return (

            <PanelGroup accordion >{menuItems}</PanelGroup>

        );

    }

    /* Recursive function to loop through menu items and check for children */

    recursiveRenderChildren(children) {
        let that = this;
        /* checker to stop recurssion if no submenu items present*/
        if (children !== undefined || children > 0) {
            return children.map((child) =>
                (
                    <Panel key={child.id.toString()}>
                    <Panel.Heading><i className="fa fa-times"></i>
                                        <Panel.Title toggle>{child.name}</Panel.Title>
                                    </Panel.Heading>
                        <Panel.Body collapsible>
                        {child.description}
                        {child.price}
                        <PanelGroup accordion >{that.recursiveRenderChildren(child.items)}</PanelGroup>
                        </Panel.Body>
                    </Panel>
                )
            );

        }
    }
}
