import React, { Component } from 'react';
import './TodoList.scss';
import Lib from './../lib';

import { inject, observer } from 'mobx-react';

import TodoItem from '../components/TodoItem';

@inject('todo')
@observer
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    };
    this.items = React.createRef();
  }

  componentDidMount() {
    Lib.createIdx();
    this.scrollToBottom();
  }

  handleChange = e => {
    this.setState({
      msg: e.target.value
    });
  };

  handleSubmit = async () => {
    const { todo } = this.props;
    const { msg } = this.state;
    const data = {
      idx: Lib.createIdx(),
      data: msg,
      checked: false
    };

    await todo.addItem(data);

    this.setState({
      msg: ''
    });

    this.scrollToBottom();
  };

  handleCheck = data => {
    const { todo } = this.props;
    todo.updateItem(data);
  };

  handleUpdate = data => {
    const { todo } = this.props;
    todo.updateItem(data);
  };

  handleRemove = idx => {
    const { todo } = this.props;
    todo.removeItem(idx);
  };

  scrollToBottom = () => {
    if (this.items.scrollHeight !== this.items.clientHeight) {
      this.items.scrollTop = this.items.scrollHeight;
    }
  };

  render() {
    const { msg } = this.state;
    const { todo } = this.props;

    const items =
      todo.todos &&
      todo.todos.map(todo => {
        return (
          <TodoItem
            key={todo.idx}
            data={todo}
            handleUpdate={this.handleUpdate}
            handleRemove={this.handleRemove}
            handleCheck={this.handleCheck}
          />
        );
      });

    return (
      <div className="todo-list">
        <header className="todo-list-header">TO DO</header>
        <div className="todo-list-items" ref={el => (this.items = el)}>
          {items}
        </div>
        <div className="todo-list-input">
          <input onChange={this.handleChange} placeholder="할일을 입력해주세요." value={msg} />
          <button onClick={this.handleSubmit}>전송</button>
        </div>
      </div>
    );
  }
}

export default TodoList;
