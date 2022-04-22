import React from "react";
//import ReactDOM from "react-dom";
import { useEffect } from "react";

const Todoitem = (props) => {

  const postCdata = async(title) => {
    try{

      let data = {
        item: title
      }

      data = JSON.stringify(data);

      let res = await fetch("https://neha-todo-app.herokuapp.com/completedtodos", {
        method: 'POST',
        body: data,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      let res_c = await res.json();
      console.log('res_c', res_c)


    }
    catch(err){
      console.log('err', err)

    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await fetch("https://neha-todo-app.herokuapp.com/todos", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })

        let data_get = await data.json();
        console.log("data_get", data_get);

        appendData(data_get);
      }
      catch (error) {
        console.log('error', error);

      }

    }
    getData();
  }, [])


  const appendData = (data) => {

    data.forEach((elem) => {

      let mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "mainDiv")

      let checkBox = document.createElement("div");
      checkBox.setAttribute("class", "checkBox");



      let todoP = document.createElement("p");
      todoP.setAttribute("class", "todoP");

      todoP.innerText = elem.item;

      let todoInpDiv = document.querySelector(".todoInpDiv");

      mainDiv.append(checkBox, todoP);
      todoInpDiv.append(mainDiv);


      let flag_selected = false;

      checkBox.addEventListener("click", () => {
        if (flag_selected === false) {
          console.log(flag_selected);
          checkBox.innerHTML = "✓";
          //.setItem("todoId", elem._id);
          deleteData(elem._id);
          postCdata(elem.item);
          todoP.style.textDecoration = "line-through";
          todoP.style.color = "grey";

          
        }
        flag_selected = true;
      })

      

    })
  }


  const deleteData = async (id) => {
    try{

      let res = await fetch(`https://neha-todo-app.herokuapp.com/todos/${id}`, {
        method: "DELETE", 
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      let data_delete = await res.json();
      console.log('data_delete', data_delete);

     // getData();
     window.location.href = "App.jsx";

    }
  catch(err) {
    console.log('err', err)

  }
  }

  return (
    <div className='todoInpDiv'>

    </div>
  )
}

export default Todoitem;