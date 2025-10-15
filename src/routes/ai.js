const express = require("express");
const AICoordinator = require("../aiCoordinator");

const router = express.Router();
const aiCoordinator = new AICoordinator();

router.post("/analyze", (req, res) => {
    try {
        const { brief } = req.body;
        
        if (!brief) {
            return res.status(400).json({ error: "Project brief is required" });
        }

        const tasks = aiCoordinator.analyzeProjectBrief(brief);
        
        res.json({
            success: true,
            message: "AI analysis completed",
            brief: brief,
            tasks: tasks,
            generatedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error("AI Analysis error:", error);
        res.status(500).json({ error: "AI analysis failed" });
    }
});

module.exports = router;