const getItems = data => {
  return JSON.parse(localStorage.getItem('item'));
};

const createIdx = () => {
  let idx = localStorage.getItem('idx');
  if (!idx) {
    localStorage.setItem('idx', 0);
  } else {
    localStorage.setItem('idx', ++idx);
  }
  return idx;
};

export default {
  getItems,
  createIdx
};
