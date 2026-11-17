import type { useState, useContext, ReactNode } from "react";

import type { User } from "./AuthContext";

export const mockUsers: User[] = [
  { id: "usr_admin_1", name: "Ade", email: "ade@teamflow.com", role: "ADMIN" },
  {
    id: "usr_worker_2",
    name: "Ola",
    email: "ola@teamflow.com",
    role: "WORKER",
  },
  {
    id: "usr_worker_3",
    name: "Tunde",
    email: "tunde@teamflow.com",
    role: "WORKER",
  },
  {
    id: "usr_worker_4",
    name: "Chioma",
    email: "chioma@teamflow.com",
    role: "WORKER",
  },
  {
    id: "usr_worker_5",
    name: "Femi",
    email: "femi@teamflow.com",
    role: "WORKER",
  },
];
