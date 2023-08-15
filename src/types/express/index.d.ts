import express from "express";

declare global {
  namespace Express {
    interface Request {
      secure_url?: string;
    }
  }
}
