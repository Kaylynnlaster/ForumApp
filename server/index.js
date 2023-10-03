const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});


app.post("/api/register", async (req, res) => {
    const { email, password, username } = req.body;
    const id = generateID();
    const result = users.filter(
        (user) => user.email === email && user.password === password
    );
     if (result.length === 0) {
        const newUser = { id, email, password, username };
        users.push(newUser);
        return res.json({
            message: "Account created successfully!",
        });
    }
    res.json({
        error_message: "User already exists",
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    let result = users.filter(
        (user) => user.email === email && user.password === password
    );
    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    res.json({
        message: "Login successfully",
        id: result[0].id,
    });
});

// Forums

app.post("/api/create/thread", async (req, res) => {
    const { thread, userId } = req.body;
    const threadId = generateID();

    console.log({ thread, userId, threadId });
});

pp.post("/api/create/reply", async (req, res) => {
    const { id, userId, reply } = req.body;
    const result = threadList.filter((thread) => thread.id === id);
    const user = users.filter((user) => user.id === userId);
    result[0].replies.unshift({
        userId: user[0].id,
        name: user[0].username,
        text: reply,
    });

    res.json({
        message: "Response added successfully!",
    });
});

app.get("/api/all/threads", (req, res) => {
    res.json({
        threads: threadList,
    });
});

app.post("/api/thread/like", (req, res) => {
    const { threadId, userId } = req.body;
    const result = threadList.filter((thread) => thread.id === threadId);
    const threadLikes = result[0].likes;
    const authenticateReaction = threadLikes.filter((user) => user === userId);
    if (authenticateReaction.length === 0) {
        threadLikes.push(userId);
        return res.json({
            message: "You've reacted to the post!",
        });
    }
    res.json({
        error_message: "You can only react once!",
    });
});

app.post("/api/thread/replies", (req, res) => {
    const { id } = req.body;
    const result = threadList.filter((thread) => thread.id === id);
    res.json({
        replies: result[0].replies,
        title: result[0].title,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});