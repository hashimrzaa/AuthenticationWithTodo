import React, { useRef, useState, useEffect } from "react";
import "./todo.css";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/Firebase/firebase";
import UserContexta from "../../context/UserContext";

const Todo = () => {
  const [userUid, setuserUid] = useState();
  const { todobg ,settodobg } = UserContexta();

  const [data, setData] = useState([]);

  const todo = useRef();

  useEffect(() => {
    settodobg(true)
    onAuthStateChanged(auth, async (user) => {
      setuserUid(user.uid);
      const q = query(
        collection(db, "todo"),
        where("uid", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const obj = {
          docId: doc.id,
          ...doc.data(),
        };
        data.push(obj);
        setData([...data]);
      });
    });
  }, []);

  const addTodo = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todo"), {
        todo: todo.current.value,
        uid: auth.currentUser.uid,
        timestamp: Timestamp.fromDate(new Date()),
      });
      setData([
        ...data,
        {
          todo: todo.current.value,
          uid: userUid,
          timestamp: Timestamp.fromDate(new Date()),
          docId: docRef.id,
        },
      ]);
      todo.current.value = "";
    } catch (e) {
      alert(e);
      console.error("Error adding document: ", e);
    }
  };

  const editTodo = async (index, editedValue) => {
    const updatedTodo = doc(db, "todo", data[index].docId);
    updateDoc(updatedTodo, {
      todo: editedValue,
    }).then(() => {
      data[index].todo = editedValue;
      setData([...data]);
    });
  };

  const deleteTodo = async (index) => {
    await deleteDoc(doc(db, "todo", data[index].docId));
    data.splice(index, 1);
    setData([...data]);
  };

  const [showTodo, setShowTodo] = useState(true);
  const editedValue = useRef();
  const [ed, seted] = useState();

  const saveEditTodo = (index) => {
    editTodo(index, editedValue.current.value);
    setShowTodo(false);
  };

  return (
    <div className="img  text-white flex items-center flex-col">
      <form
        onSubmit={addTodo}
        className="mt-20 flex flex-wrap justify-center items-center gap-2 m-1"
      >
        <input
          type="text"
          ref={todo}
          required
          className="p-2 rounded bg-transparent border-2 w-[80vw]"
        />
        <button
          variant="contained"
          type="submit"
          className="btn color text-white border-2"
        >
          Add Todo
        </button>
      </form>
      <div className="mt-4 h-[50vh] overflow-auto flex flex-col">
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <div key={index} className="mt-3">
                {index === ed && showTodo ? (
                  <div className="flex gap-2 flex-wrap justify-center w-[85vw] px-1 rounded ">
                    <input
                      className="p-3 rounded bg-transparent border-2 w-[60vw] "
                      type="text"
                      placeholder="edited value"
                      ref={editedValue}
                    />
                    <button className="p-3 border-2 rounded color" onClick={() => saveEditTodo(index)}>
                      save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between flex-wrap border w-[85vw] rounded color">
                    <div className="p-3 overflow-auto">{item.todo}</div>
                    <div className="flex gap-3 p-2">
                      <button onClick={() => deleteTodo(index)}>Delete</button>
                      <button
                        onClick={() => {
                          setShowTodo(true);
                          seted(index);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-[20px]">No todo found</div>
        )}
      </div>
    </div>
  );
};

export default Todo;
