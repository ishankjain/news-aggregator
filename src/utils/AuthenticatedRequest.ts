import { Request } from "express";

// Define the interface to extend the Request to contain the authenticated user.
export interface AuthenticatedRequest extends Request {
  user?: any;
}
