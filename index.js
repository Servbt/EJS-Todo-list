import express, { response } from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let todoList = [];
let tempval;
let newstring;

function Todo(title, content) {
    this.title = title;
    this.content = content;
    this.html = function () {
        return `<h1>${this.title}</h1><p>${this.content}</p>`
    };
    this.target = function () {
        console.log(this.i);
    };
};

app.get("/", (req, res) => {
    //checks if theres any temp data, obv if user is new then no data is imported
    if (todoList.length === 0) {
        res.render("index.ejs");
    } else {
        res.render("index.ejs", { todoList: todoList });
    }
});

// route for clicking a todo created on the sidebar from the form.ejs functionality
app.post(`/content`, (req, res) => {
    tempval = req.body.value;
    // console.log(tempval);
    res.render("content.ejs", { todoList: todoList, tempval: tempval })
});

// this is the route for getting all todos to appear on the page
app.get("/allTodos", (req, res) => {
    res.render("allTodos.ejs", { todoList: todoList });
});

// adds todo to list to array so that sidebar can access it
app.post("/create", (req, res) => {
    let newTodo = new Todo(req.body.title, req.body.content);
    todoList.push(newTodo);
    // console.log(todoList);
    // console.log(todoList[0].title)
    res.render("index.ejs", { todoList: todoList });

});

// Pagination for Todo editing, there is functionality inside to send user to the todo editing route below
app.post("/edit-todo", (req, res) => {
    tempval = req.body.value;
    res.render("editTodo.ejs", { todoList: todoList, tempval: tempval });
});

// route with functionality for editing todos
app.post("/postedit", (req, res) => {
    let response = req.body;
    console.log(response);
    todoList[tempval].title = response.title;
    todoList[tempval].content = response.content;
    res.render("content.ejs", { todoList: todoList, tempval: tempval });
    // res.send('Form submitted successfully!');

});

// Route functionality for checking if todo is available iterates through todolist to find the right title and then index that is used for loading the proper todo.
app.post("/find-todo", (req, res) => {
    newstring = req.body.string;
    function checkstring(newstring) {
        for (i = 0; i < todoList.length; i++) {
            if (todoList[i].title === newstring) {
                return i;
            } else {
                return res.render("failToFind.ejs", { todoList: todoList, tempval: tempval });
            }
        }
    }
    console.log(checkstring(newstring));
    tempval = checkstring(newstring);
    res.render("content.ejs", { todoList: todoList, tempval: tempval });
});

// route with functionality for deleting todos, just splices temp data pushed in array made from the create-todo route
app.post("/delete-todo", (req, res) => {
    todoList.splice(tempval, 1);
    res.render("index.ejs", { todoList: todoList, tempval: tempval });

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
