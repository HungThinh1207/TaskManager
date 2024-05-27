import Notice from "../models/notification.js";
import Project from "../models/project.js";
import Task from "../models/task.js";
import User from "../models/user.js";

export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;

    const { title, team, projectId, stage, date, endDate, priority, assets, typeIssue } = req.body;

    let text = "Nhiệm vụ mới đã được giao cho bạn";
    if (team?.length > 1) {
      text = text + ` và ${team?.length - 1} người khác`;
    }

    text =
      text +
      ` .Ưu tiên nhiệm vụ được đặt là ${priority} vì vậy hãy kiểm tra và hành động phù hợp. Ngày nhiệm vụ là ${new Date(
        date
      ).toDateString()}. Cảm ơn`;

    const activity = {
      type: "assigned",
      activity: text,
      by: userId,
    };

    //let project = await Project.findOne({
    //tasks: { $all: [title, team, stage, date, endDate, priority, assets] },
    //})

    // if (!project) {
    //   console.log("ko co task nao ton tai")
    // }

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      endDate,
      projectId,
      priority: priority.toLowerCase(),
      assets,
      activities: activity,
      typeIssue: typeIssue.toLowerCase(),
    });

    //day task vao project
    const project = await Project.findOne({ _id: projectId });
    project.tasks.push(task);
    await project.save();

    await Notice.create({
      team,
      text,
      task: task._id,
    });

    res
      .status(200)
      .json({ status: true, task, message: "Tạo nhiệm vụ thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const duplicateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    const newTask = await Task.create({
      ...task,
      title: task.title + " - Task nhân bản",
    });

    newTask.projectId = task.projectId;
    newTask.team = task.team;
    newTask.subTasks = task.subTasks;
    newTask.assets = task.assets;
    newTask.priority = task.priority;
    newTask.stage = task.stage;
    newTask.typeIssue = task.typeIssue;

    //day task vao project
    const project = await Project.findOne({ _id: newTask.projectId });
    project.tasks.push(task);
    await project.save();

    await newTask.save();

    //alert users of the task
    let text = "Nhiệm vụ mới đã được giao cho bạn";
    if (task.team.length > 1) {
      text = text + ` và ${task.team.length - 1} người khác.`;
    }

    text =
      text +
      ` .Ưu tiên nhiệm vụ được đặt là ${task.priority
      } vì vậy hãy kiểm tra và hành động phù hợp. Ngày nhiệm vụ là ${task.date.toDateString()}.!!!`;

    await Notice.create({
      team: task.team,
      text,
      task: newTask._id,
    });

    res
      .status(200)
      .json({ status: true, message: "Nhiệm vụ được sao chép thành công." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const postTaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const task = await Task.findById(id);

    const data = {
      type,
      activity,
      by: userId,
    };

    task.activities.push(data);

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Hoạt động đã đăng thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const dashboardStatistics = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    const allTasks = isAdmin
      ? await Task.find({
        isTrashed: false,
      })
        .populate({
          path: "team",
          select: "name role title email",
        })
        .sort({ _id: -1 })
      : await Task.find({
        isTrashed: false,
        team: { $all: [userId] },
      })
        .populate({
          path: "team",
          select: "name role title email",
        })
        .sort({ _id: -1 });

    const users = await User.find({ isActive: true })
      .select("name title role isAdmin createdAt")
      .limit(10)
      .sort({ _id: -1 });

    //Nhóm nhiệm vụ theo giai đoạn và tính toán
    const groupTaskks = allTasks.reduce((result, task) => {
      const stage = task.stage;

      if (!result[stage]) {
        result[stage] = 1;
      } else {
        result[stage] += 1;
      }

      return result;
    }, {});

    //Nhóm nhiệm vụ theo mức độ ưu tiên
    const groupData = Object.entries(
      allTasks.reduce((result, task) => {
        const { priority } = task;

        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    //nhom nhiem vu theo stage
    const stageData = Object.entries(
      allTasks.reduce((result, task) => {
        const { stage } = task;

        result[stage] = (result[stage] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    //Tính tổng nhiệm vụ
    const totalTasks = allTasks?.length;
    const last10Task = allTasks?.slice(0, 100);

    const summary = {
      totalTasks,
      last10Task,
      users: isAdmin ? users : [],
      tasks: groupTaskks,
      graphData: groupData,
      stagesData: stageData,
    };

    res.status(200).json({
      status: true,
      message: "Thành công",
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { stage, isTrashed } = req.query;

    let query = { isTrashed: isTrashed ? true : false };

    if (stage) {
      query.stage = stage;
    }

    let queryResult = Task.find(query)
      .populate({
        path: "team",
        select: "name title email",
      })
      .sort({ _id: -1 });

    const tasks = await queryResult;

    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

//can phai xu li them cac dieu kien de hien thi ra task
// export const getProjectTask = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       // Kiểm tra xem 'id' có phải là một ObjectId hợp lệ của MongoDB không
//       return res.status(400).json({ status: false, message: "ID project không hợp lệ" });
//     }

//     const project = await Project.findById(id).populate("tasks");

//     if (!project) {
//       return res.status(404).json({ status: false, message: `Không tìm thấy project với ID: ${id}` });
//     }

//     const tasks = project.tasks;
//     res.status(200).json({
//       status: true,
//       tasks,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: false, message: "Lỗi server khi lấy tasks" });
//   }
// };
export const getProjectTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, isTrashed } = req.query;

    // Kiểm tra xem 'id' có phải là một ObjectId hợp lệ của MongoDB không
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ status: false, message: "ID project không hợp lệ" });
    }

    // Xây dựng điều kiện truy vấn dựa trên stage và isTrashed
    let query = { _id: { $in: [] }, isTrashed: isTrashed === 'true' };

    if (stage) {
      query.stage = stage;
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ status: false, message: `Không tìm thấy project với ID: ${id}` });
    }

    // Lấy danh sách ID của tasks từ project
    query._id.$in = project.tasks;

    // Truy vấn các task với điều kiện đã được xác định
    const tasks = await Task.find(query).populate({
      path: "team",
      select: "name title email",
    }).sort({ _id: -1 });

    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Lỗi server khi lấy tasks" });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate({
        path: "team",
        select: "name title role email",
      })
      .populate({
        path: "activities.by",
        select: "name",
      });

    res.status(200).json({
      status: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const createSubTask = async (req, res) => {
  try {
    const { title, tag, date } = req.body;
    const { id } = req.params;

    const newSubTask = {
      title,
      date,
      tag,
    };

    const task = await Task.findById(id);

    task.subTasks.push(newSubTask);

    await task.save();

    res.status(200).json({ status: true, message: "Nhiệm vụ phụ thêm thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId, title, date, endDate, team, stage, priority, assets, typeIssue } = req.body;

    const task = await Task.findById(id);

    task.projectId = projectId;
    task.title = title;
    task.date = date;
    task.endDate = endDate;
    task.priority = priority.toLowerCase();
    task.assets = assets;
    task.stage = stage.toLowerCase();
    task.team = team;
    task.typeIssue = typeIssue.toLowerCase();

    //day task vao project
    if (!projectId) {
      const project = await Project.findOne({ _id: projectId });
      project.tasks.push(task);
      await project.save();
    }


    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Chỉnh sửa nhiệm vụ thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const trashTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    task.isTrashed = true;

    await task.save();

    res.status(200).json({
      status: true,
      message: `Nhiệm vụ được chuyển vào thùng rác thành công`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// export const deleteRestoreTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { actionType } = req.query;

//     if (actionType === "delete") {
//       await Task.findByIdAndDelete(id);
//     } else if (actionType === "deleteAll") {
//       await Task.deleteMany({ isTrashed: true });
//     } else if (actionType === "restore") {
//       const resp = await Task.findById(id);

//       resp.isTrashed = false;
//       resp.save();
//     } else if (actionType === "restoreAll") {
//       await Task.updateMany(
//         { isTrashed: true },
//         { $set: { isTrashed: false } }
//       );
//     }

//     res.status(200).json({
//       status: true,
//       message: `Thao tác được thực hiện thành công`,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ status: false, message: error.message });
//   }
// };
export const deleteRestoreTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType } = req.query;

    if (actionType === "delete") {
      // Tìm task cần xóa
      const deletedTask = await Task.findByIdAndDelete(id);

      // Nếu task tồn tại, thực hiện xóa id của task khỏi danh sách tasks của project
      if (deletedTask) {
        const projectId = deletedTask.projectId;
        const project = await Project.findById(projectId);

        if (project) {
          project.tasks.pull(id); // Xóa id của task khỏi danh sách tasks
          await project.save();
        }
      }
    } else if (actionType === "deleteAll") {
      // Tìm tất cả các task cần xóa
      const deletedTasks = await Task.find({ isTrashed: true });

      // Duyệt qua từng task và xóa id của task khỏi danh sách tasks của project
      for (const deletedTask of deletedTasks) {
        const projectId = deletedTask.projectId;
        const project = await Project.findById(projectId);

        if (project) {
          project.tasks.pull(deletedTask._id);
          await project.save();
        }
      }
      await Task.deleteMany({ isTrashed: true });
    } else if (actionType === "restore") {
      const resp = await Task.findById(id);

      resp.isTrashed = false;
      resp.save();
    } else if (actionType === "restoreAll") {
      await Task.updateMany(
        { isTrashed: true },
        { $set: { isTrashed: false } }
      );
    }

    res.status(200).json({
      status: true,
      message: `Thao tác được thực hiện thành công`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

