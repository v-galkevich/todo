export default class Item {
    constructor(title) {
        this._title = title;
        this._isCompleted = false;
        this._id = Date.now();
    }

    changeStatus() {
        this._isCompleted = !this._isCompleted;
    }

    get title() {
        return this._title;
    }

    get status() {
        return this._isCompleted;
    }

    get id() {
        return this._id;
    }

    renderItem(id) {
        return `<li data-id="${this.id}" ${this.status ? ' class="todo-item completed"' : 'class="todo-item active"'} >
                        <input type="checkbox" class="toggle">
                       <label>${this.title}</label>
                        <span class="delete-item">x</span>
                    </li>`;
    }

}