import express, { response } from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let todoList = [];
let tempval;

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
        res.render("index.ejs", { todoList: todoList});
    }
});

// route for clicking a todo created on the sidebar from the form.ejs functionality
app.post(`/content`, (req, res) => {
    tempval = req.body.value;
    console.log(tempval);
    res.render("content.ejs", { todoList: todoList, tempval: tempval })
});

// Need to work on getting a list of all todos route
app.get("/allTodos", (req, res) => {
    res.render("index.ejs", { todoList: todoList });
});

// adds todo to list to array so that sidebar can access it
app.post("/create", (req, res) => {
    let newTodo = new Todo(req.body.title, req.body.content);
    todoList.push(newTodo);
    // console.log(todoList);
    // console.log(todoList[0].title)
    res.render("index.ejs", { todoList: todoList });

});

app.put("/todo/code", (req, res) => {
    console.log("Hello World");
    res.sendStatus(200);
});

app.delete("/todo/code", (req, res) => {
    console.log("Hello World");
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
