const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_URL = "http://localhost:5000/todos";

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { context, isCompleted } = req.body;
        const newTodo = { context, isCompleted };

        const response = await axios.post(API_URL, newTodo);
        res.json(response.data);
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.patch(`${API_URL}/${id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await axios.delete(`${API_URL}/${id}`);
        res.json({ message: "Todo deleted" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
