export const API_SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

const Routes = {
  login: "/login",
  logout: "/logout",
  upload: "/upload",
  attachments: "/attachments",
} as const;

export default Routes;
