import React from 'react';

import './TodoItem.scss';

const TodoItem = ({ data, handleRemove, handleUpdate, handleCheck }) => {
  const [msg, setMsg] = React.useState(data.data);
  const [status, setStatus] = React.useState(0);

  const update = () => {
    if (status === 1) {
      handleUpdate({ idx: data.idx, data: msg, checked: data.checked });
    }
    status === 0 ? setStatus(1) : setStatus(0);
  };

  const remove = () => {
    if (status === 0) {
      handleRemove(data.idx);
    }
    status === 0 ? setStatus(1) : setStatus(0);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={data.checked}
        onChange={e => handleCheck({ idx: data.idx, data: msg, checked: e.target.checked })}
      />

      <div className="todo-item-data">
        {(() => {
          return status === 0 ? (
            data.data
          ) : (
            <input value={msg} onChange={e => setMsg(e.target.value)} />
          );
        })()}
      </div>
      <div className="todo-item-buttons">
        <button onClick={() => update()}>수정</button>
        <button onClick={() => remove()}>{status === 0 ? '삭제' : '취소'}</button>
      </div>
    </div>
  );
};

export default TodoItem;
