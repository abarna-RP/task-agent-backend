class AICoordinator {
    analyzeProjectBrief(brief) {
        console.log("🤖 AI Coordinator analyzing:", brief);
        
        // Simple AI logic - brief analyze panni tasks split pannum
        const tasks = {
            frontend: [],
            backend: [],
            database: []
        };

        if (brief.toLowerCase().includes('task') && brief.toLowerCase().includes('management')) {
            tasks.frontend.push("Create task list UI components");
            tasks.frontend.push("Build task creation form");
            tasks.backend.push("Implement task CRUD APIs");
            tasks.database.push("Design task schema");
        }

        if (brief.toLowerCase().includes('auth') || brief.toLowerCase().includes('login')) {
            tasks.frontend.push("Create login/register pages");
            tasks.backend.push("Implement JWT authentication");
            tasks.database.push("Design user schema with password hashing");
        }

        if (brief.toLowerCase().includes('share') || brief.toLowerCase().includes('collaborat')) {
            tasks.backend.push("Implement task sharing functionality");
            tasks.frontend.push("Add share task feature in UI");
        }

        if (brief.toLowerCase().includes('file') || brief.toLowerCase().includes('upload')) {
            tasks.backend.push("Create file upload API");
            tasks.frontend.push("Build file attachment component");
        }

        // Default tasks
        if (tasks.frontend.length === 0) {
            tasks.frontend.push("Create responsive React UI");
            tasks.backend.push("Build REST APIs");
            tasks.database.push("Design database schema");
        }

        return tasks;
    }
}

module.exports = AICoordinator;