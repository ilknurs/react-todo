import React, { useState, useEffect } from 'react'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import { toast } from 'react-hot-toast';
import {format} from 'date-fns'
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux'
import { MdDelete, MdEdit } from 'react-icons/md';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
  
    useEffect(() => {
      if (todo.status === 'complete') {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }, [todo.status]);
  
    const handleCheck = () => {
      setChecked(!checked);
      dispatch(
        updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
      );
    };
  
    const handleDelete = () => {
      dispatch(deleteTodo({id: todo.id}));
      toast.success('Todo Deleted Successfully');
    };
  
    const handleUpdate = () => {
      setUpdateModalOpen(true);
    };

      return (
        <>
          <motion.div className={styles.item} variants={child}>
            <div className={styles.todoDetails}>
            <CheckButton checked={checked} handleCheck={handleCheck} />
              <div className={styles.texts}>
                <p
                  className={getClasses([
                    styles.todoText,
                    todo.status === 'complete' && styles['todoText--completed'],
                  ])}
                >
                  {todo.title}
                </p>
                <p className={styles.time}>
                  {format(new Date(todo.time), 'p, MM/dd/yyyy')}
                </p>
              </div>
            </div>
            <div className={styles.todoActions}>
              <div
                className={styles.icon}
                onClick={() => handleDelete()}
                onKeyDown={() => handleDelete()}
                tabIndex={0}
                role="button"
              >
                <MdDelete />
              </div>
              <div
                className={styles.icon}
                onClick={() => handleUpdate()}
                onKeyDown={() => handleUpdate()}
                tabIndex={0}
                role="button"
              >
                <MdEdit />
              </div>
            </div>
          </motion.div>
          <TodoModal
            type="update"
            modalOpen={updateModalOpen}
            setModalOpen={setUpdateModalOpen}
            todo={todo}
          />
        </>
      );
    }
    
    export default TodoItem;