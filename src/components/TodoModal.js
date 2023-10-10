import React from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo } from "../slices/todoSlice";
import {v4 as uuid} from  "uuid";
import toast from "react-hot-toast"
function TodoModal({ modalOpen, setModalOpen }) {
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState("incomplete");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && status ) {
      dispatch(addTodo(
        {
          id: uuid(),
          title,
          status,
          time: new Date().toLocaleString(),
        })
        );
        toast.success('Task added successfully')
            setModalOpen(false);
    } else {
      toast.error('Title shouldn\'t be empty')
    }
  };

  return (
    //Modeli yalnızca açıksa render et.
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
        {/* Close button */}
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          {/* Todo form */}
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}> Add Task</h1>
             {/* Title input */}
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            {/* Status select */}
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
             {/* Button container */}
            <div className={styles.buttonContainer}>
            {/* Add Task button */}
              <Button type="submit" variant="primary">
                Add Task
              </Button>
               {/* Cancel button */}
              <Button
                type="button"
                variant="secondary"
                onClick={(e) => setModalOpen(false)}
                onKeyDown={(e) => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModal;
