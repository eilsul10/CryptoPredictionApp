import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {
    // Initialize the state with an empty todos array
    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    // componentDidMount lifecycle method is added to retrieve todos data from database
    componentDidMount() {
        // axios.get method is used to access the /todos endpoint.
        // Once result becomes available, we're assigning response.data to the todos property of the component's state object
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    // TodoList method will output a table row for each todo item
    // Inside this method we're iterating through the list of todo items by using the map function
    // The current todo item is assigned to the todo property of this component
    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key = {i} />;
        })
    }

    render() {
        return(
           <div>
               <h3>Trading Todo List</h3>
               <table className = "table table-striped" style = {{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
               </table>
           </div>
        )
    }
}