import React, { Component } from 'react';
import menuData from "./Butcher's burger menu-2.json";


export default class AddEditItems extends React.Component {

    render() {

        let menuItems=this.recursiveRenderChildren(menuData.categories);

        return(
        <div>{menuItems}</div>
         )

    }

    recursiveRenderChildren(children) {
        let that = this;
        /* checker to stop recurssion if no submenu items present*/
        if (children !== undefined || children > 0){
        return children.map((child) =>
                (
                 <li key={child.id.toString()}>{child.name}
                 <ul>{that.recursiveRenderChildren(child.items)}</ul>
                 </li>
                )
            );

         }
     }
     

}