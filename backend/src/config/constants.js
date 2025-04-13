require("dotenv").config();

const JWT_PRIVATE_KEY = process.env.JWT_SECRET || "CategoryManagement@123";
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://kalyanpandaga24:KalyanPandaga@mycluster.axjo7.mongodb.net/categoryManagementLocal?retryWrites=true&w=majority&appName=MyCluster";
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

const allowedOrigins = [process.env.FRONTEND_URL] || ["http://localhost:3000"];

module.exports = { JWT_PRIVATE_KEY, MONGO_URI, PORT, allowedOrigins };
