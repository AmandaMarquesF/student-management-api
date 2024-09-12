const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/swagger/swagger.yaml');

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const Student = require("./models/studentModel");
const Room = require("./models/roomModel");
const Teacher = require("./models/teacherModel");

Student.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });
Student.belongsTo(Room, { foreignKey: "room_id", as: "room" });
Teacher.hasMany(Student, { foreignKey: "teacher_id", as: "students" });
Room.hasMany(Student, { foreignKey: "room_id", as: "students" });

app.use(express.json());
app.use("/api/students", studentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/teachers", teacherRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
