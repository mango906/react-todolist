import { observable, action } from 'mobx';

class TodoStore {
  @observable
  todos = JSON.parse(localStorage.getItem('item') || '[]');

  @action.bound
  async addItem(data) {
    this.todos = await [...this.todos, data];
    await this.setItem();
  }

  @action.bound
  removeItem(idx) {
    const find = el => {
      return el.idx === idx;
    };

    const result = this.todos.findIndex(find);

    const array = [...this.todos];
    array.splice(result, 1);

    this.todos = array;

    this.setItem();
  }

  @action.bound
  updateItem(data) {
    const find = el => {
      return el.idx === data.idx;
    };

    const result = this.todos.findIndex(find);
    this.todos = this.todos.map((todo, i) => (i === result ? data : todo));

    this.setItem();
  }

  setItem() {
    localStorage.setItem('item', JSON.stringify(this.todos));
  }
}

export default TodoStore;
