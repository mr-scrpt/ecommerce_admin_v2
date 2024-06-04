import express from "express";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { appRouter } from "../../src/app/api/trpc/[trpc]/route";
// Генерация типов и схемы
const typesSchema = {
  inputs: inferRouterInputs(appRouter),
  outputs: inferRouterOutputs(appRouter),
};

const app = express();

app.get("/types", (req, res) => {
  res.json(typesSchema);
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
