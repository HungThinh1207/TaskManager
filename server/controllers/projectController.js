//import Task from "../models/task";
//import User from "../models/user";
import Project from "../models/project.js";

export const createProject = async (req, res) => {
    try {
        const { name, date, endDate, tasks } = req.body;
        const newProject = await Project.create({
            name,
            date,
            endDate,
            //tasks, // ObjectId của các công việc liên quan đến dự án
        });

        res.status(200).json({
            status: true,
            project: newProject,
            message: "Tạo dự án thành công",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(
            // status: true,
            projects,
        );
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}

export const getProject = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ request parameters
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy dự án' });
        }

        res.status(200).json({
            status: true,
            project,
        });
    } catch (error) {
        console.error('Lỗi khi lấy dự án:', error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date, endDate } = req.body;

        const project = await Project.findById(id);

        project.name = name;
        project.date = date;
        project.endDate = endDate;

        await project.save();

        res
            .status(200)
            .json({ status: true, message: "Chỉnh sửa dự án thành công" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {

        const { id } = req.params;
        await Project.findByIdAndDelete(id);

        res.status(200).json({
            status: true,
            message: `Xóa dự án được thực hiện thành công`,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}