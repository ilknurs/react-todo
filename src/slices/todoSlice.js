import {createSlice} from '@reduxjs/toolkit';

const getInitialTodo = () => {
    //todo list alınıyor
    const localTodoList = window.localStorage.getItem('todoList');
    //eğer boşsa boş bir dizi döndürüyor
    if(localTodoList){
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('todoList', JSON.stringify([]))
    return [];
};




const initialValue = {
    filterStatus: 'all',
    todoList: getInitialTodo(),
  };
  
export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
      addTodo: (state, action) => {
        state.todoList.push(action.payload);
        const todoList = window.localStorage.getItem('todoList');
        if (todoList) {
          const todoListArr = JSON.parse(todoList);
          todoListArr.push({
            ...action.payload,
          });
          window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        } else {
          window.localStorage.setItem(
            'todoList',
            JSON.stringify([
              {
                ...action.payload,
              },
            ])
          );
        }
      }
    },
 } );
export const {addTodo} = todoSlice.actions;
    
export default todoSlice.reducer
    