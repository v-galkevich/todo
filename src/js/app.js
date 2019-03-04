import '../style/style.scss';

import Item from './Item';
import Model from './model';
import View from './view';
import Controller from './controller';

const item1 = new Item('дело 1');
setTimeout(start, 100);

function start() {
    const item2 = new Item('дело 2');

    const model = new Model([item1, item2]);
    const view = new View(model);
    const controller = new Controller(model, view);
    controller.setView();
}




