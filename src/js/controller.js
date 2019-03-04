export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.bindAddItem(this.addItem.bind(this));
        view.bindDeleteItem(this.deleteItem.bind(this));
        view.bindToggleItem(this.toggleItem.bind(this));
        view.bindFilter(this.setView.bind(this));
        view.bindRemoveCompleted(this.removeCompleted.bind(this));
    }

    init() {
        this.setView(this.model.VIEW);
    }

    addItem(title) {
        this.model.addItem(title);
        this.view.clearInput();
        this.init();
    }

    deleteItem(id) {
        this.model.deleteItem(id);
        //this.view.deleteItemFromList(id);
        this.init();
    }

    toggleItem(id) {
        this.model.changeStatus(id);
        this.init();
    }

    setView(option) {
        let items;

        switch(option) {
            case 'active':
                items = this.model.updateCurrentItems({completed:false});
                break;
            case 'completed':
                items = this.model.updateCurrentItems({completed:true});
                break;
            default:
                items = this.model.items;
                break;
        }
        this.model.changeView(option);

        if(items) {
            this.view.buildList(items);
            this.showBtnIfNecessary(items);
        }
    }

    showBtnIfNecessary(items) {
        let len = items.length;

        for( let i = 0; i < len; i++ ) {
            if ( items[i].status === true ) {
                this.view.setVisibility(true);
                break;
            } else {
                this.view.setVisibility(false);
            }
        }
    }

    removeCompleted() {
        let len = this.model.items.length;
        let arr = [];

        for( let i = 0; i < len; i++ ) {
            if ( this.model.items[i].status === true ) {
                arr.push(this.model.items[i].id);
            }
        }

        let arr_len = arr.length;

        for( let i = 0; i < arr_len; i++ ) {
            this.model.deleteItem(arr[i]);
        }
        this.view.setVisibility(false);
        this.init();
    }

}