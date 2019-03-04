
export default class View {
    constructor(model){
        this.model = model;

        this.input = document.getElementById('main-input');
        this.list = document.getElementById('todo-list');
        this.filters = document.getElementsByClassName('filter-option');
        this.itemsCount = document.getElementById('items-count');
        this.clearCompletedBtn = document.getElementById('clear-completed');

    }

    bindAddItem(handler) {
        this.input.addEventListener('change', function(event) {
            const title = event.target.value;
            if(title) {
                handler(title);
            }
        });
    }

    bindDeleteItem(handler) {
        this.list.addEventListener('click', function (event) {
            const potentialElements = this.getElementsByClassName('delete-item');
            let len = potentialElements.length;
            const target = event.target;

            for (let i = 0; i < len; i++) {
                if( potentialElements[i] === target ) {
                    const itemId = target.parentNode.getAttribute('data-id');
                    handler(itemId);
                }
            }
        });
    }

    bindToggleItem(handler) {
        this.list.addEventListener('click', function (event) {
            const potentialElements = this.getElementsByClassName('toggle');
            let len = potentialElements.length;
            const target = event.target;

            for (let i = 0; i < len; i++) {
                if( potentialElements[i] === target ) {
                    const itemId = target.parentNode.getAttribute('data-id');
                    handler(itemId);
                }
            }
        });
    }

    bindFilter(handler) {
        let len = this.filters.length;

        for (let i = 0; i < len; i++) {
            this.filters[i].addEventListener('click', function(e){
                let option = event.target.getAttribute('data-filter');
                handler(option);
                document.querySelector('.filter-option.selected').className = 'filter-option';
                event.target.className += ' selected';
            });
        }
    }

    bindRemoveCompleted(handler) {
        this.clearCompletedBtn.addEventListener('click', handler);
    }

    /*deleteItemFromList(id) {
        const elem = this.list.querySelector(`[data-id="${id}"]`);
        if (elem)
            this.list.removeChild(elem);
    }*/

    getItemsCount(count){
        this.itemsCount.innerHTML = `${count} item${count !== 1 ? 's' : ''} left`;
    }

    clearInput() {
        this.input.value = '';
    }

    setVisibility(visible) {
        this.clearCompletedBtn.style.visibility = !!visible ? 'visible' : 'hidden';
    }

    buildList(items) {
        items = items || this.model.items;
        const list_length = items.length;
        let str = '';

        for( let i = 0; i < list_length; i++ ) {
            str +=  items[i].renderItem(i);
        }
        this.list.innerHTML = str;

        this.getItemsCount(list_length);
    }
}