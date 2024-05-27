import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', require: true },
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    endDate: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    typeIssue: {
      type: String,
      default: "design",
      enum: ["design", "document", "front-end", "back-end", "database", "test", "fix"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },
    activities: [{
      type: {
        type: String,
        default: "assigned",
        enum: [
          "assigned",
          "started",
          "in progress",
          "bug",
          "completed",
          "commented",
        ],
      },
      activity: String,
      date: { type: Date, default: new Date() },
      by: { type: Schema.Types.ObjectId, ref: "User" },
    }],

    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],
    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//cho tg cua task k vuot qua project
taskSchema.pre('save', async function (next) {
  const task = this;
  const Project = mongoose.model('Project');
  const project = await Project.findById(task.projectId);

  if (!project) {
    return next(new Error('Dự án không tìm thấy'));
  }

  const projectStartDate = project.date;
  const projectEndDate = project.endDate;

  if (task.date < projectStartDate || task.endDate > projectEndDate) {
    return next(new Error('Start date và End date phải nằm trong thời gian của dự án'));
  }

  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
