import axios from "axios";

interface TaskValues {
    title: string;
    description?: string;
    completed?: boolean;
    priority?: string;
    dueDate?: string;
    labels?: string[];
}

export const useTask = (values: TaskValues, token: string | null | undefined) => {
    const createTask = async () => {
        try {
            const response = await axios.post(
                "https://express-js-1z8q.onrender.com/api/task",
                {
                    title: values.title,
                    description: values.description,
                    completed: values.completed,
                    priority: values.priority,
                    dueDate: values.dueDate,
                    labels: values.labels,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Task created:", response.data);
            return response.data;
        } catch (err: any) {
            console.error("Error creating task:", err.response?.data || err.message);
            throw err;
        }
    };

    return { createTask };
};
