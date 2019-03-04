/*
* @param {Item} item
* @param {Array <Item>} items
* */

import Item from './Item';

export default class Model {
    constructor(items) {
        this.items = items || [];

        this.currentItems = [];
        this.VIEW = 'all'; //active/completed
    }

    findItem(id) {
        id = id * 1;
        let len = this.items.length;

        for (let i = 0; i < len; i++) {
            if (this.items[i].id === id)
                return {'item' : this.items[i], 'index' : i};
        }
    }

    addItem(item) {
        this.items.push( new Item(item) );
    }

    deleteItem(id) {
        const index = this.findItem(id).index;
        this.items.splice(index, 1);
    }

    changeStatus(id) {
        const index = this.findItem(id).index;
        this.items[index].changeStatus();
    }

    changeView(newView) {
        this.VIEW = newView;
    }

    updateCurrentItems(option) {
        const len = this.items.length;
        this.currentItems = [];

        for( let i = 0; i < len; i++ ) {
            if ( this.items[i].status === option.completed ) {
                this.currentItems.push(this.items[i]);
            }
        }
        return this.currentItems;
    }

}