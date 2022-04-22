import React from "react";


const CompletedTodo = (props) => {

    const showData = async () => {

        try {

            let res = await fetch("https://neha-todo-app.herokuapp.com/completedtodos");

            let data = await res.json();
            console.log('data', data);

            appendData(data);

        }
        catch (err) {
            console.log('err', err)

        }
    }

    const appendData = (data) => {
        data.forEach((elem) => {

            let mainDiv = document.createElement("div");
            mainDiv.setAttribute("class", "mainDiv")

            let checkBox = document.createElement("div");
            checkBox.setAttribute("class", "checkBox");



            let todoP = document.createElement("p");
            todoP.setAttribute("class", "todoP");

            todoP.innerText = elem.item;

            let todoInpDiv = document.querySelector(".CtodoInpDiv");

            mainDiv.append(checkBox, todoP);
            todoInpDiv.append(mainDiv);


            let flag_selected = false;

            checkBox.addEventListener("click", () => {
                if (flag_selected === false) {
                    console.log(flag_selected);
                    checkBox.innerHTML = "✓";
                    deleteData(elem._id);

                    todoP.style.textDecoration = "line-through";
                    todoP.style.color = "grey";


                }
                flag_selected = true;
            })

        })
    }


    const deleteData = async (id) => {
        try {

            let res = await fetch(`https://neha-todo-app.herokuapp.com/completedtodos/${id}`, {
                method: "DELETE",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            })

            let data_delete = await res.json();
            console.log('data_delete', data_delete);

            // getData();
            setTimeout(() => {
                window.location.href = "App.jsx";
            }, 10);

        }
        catch (err) {
            console.log('err', err)

        }
    }

    return (

        <div className="showCDiv">
            <button className='showC' onClick={showData}>Show Completed Todos</button>

            <div className='CtodoInpDiv'>

            </div>
        </div>


    )
}

export default CompletedTodo;