import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "user",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "ijamy",
    email: "ijamy@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;
