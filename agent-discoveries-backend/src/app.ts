import express from "express";

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
