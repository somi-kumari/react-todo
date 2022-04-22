
import './App.css';

import { useState } from 'react';
 import Todoitem from './components/todo.jsx';
 import CompletedTodo from './components/completed.jsx';

function App() {
    const [query, setItem] = useState("");


  const postData = async () => {
    try {

      let inp = {
        item: query
      }
      inp = JSON.stringify(inp);

      let data = await fetch("https://neha-todo-app.herokuapp.com/todos", {
        method: 'POST',
        body: inp,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      let res = await data.json();
      console.log('res', res);

      setTimeout(() => {
        window.location.href = "App.jsx"
      }, 10)

    }
    catch (err) {
      console.log('err', err)

    }
  }


  return (
    <div className="Appbackground">

      <div className="App">

      <h1>Todo App</h1>

        <div className="inputDiv">
          <input type="text" placeholder='Add Item Here' value={query} onChange={(e) => setItem(e.target.value)} />
          <button onClick={() => {
            postData()
          }}>➕</button>
        </div>

        <div className='listDiv'>

          {<Todoitem />}


        </div>



      </div>
      
      {<CompletedTodo/>}
    </div>
  );
}

export default App;

