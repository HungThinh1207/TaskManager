import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        name: { type: String, required: true },
        date: { type: Date, default: new Date() },
        endDate: { type: Date, default: new Date() },
        tasks: [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
            default: []
        }],
    }
)

const Project = mongoose.model("Project", projectSchema);

export default Project;