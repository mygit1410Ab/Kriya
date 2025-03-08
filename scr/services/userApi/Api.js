export const endPoint = {
  auth: {
    signUp: '/auth/signup', //POST
    logIn: '/auth/login', //POST
    reFreshTocken: '/auth/refresh', //post
    logout: '/auth/logout', //post
  },
  management: {
    getUser: '/auth/me', //GET
    createTask: '/tasks', //POST
    getAllTask: '/tasks', //GET
    upDateTask: '/tasks/', //PUT
    getTaskById: '/tasks/', //GET
    deleteTaskById: '/tasks/', //DELTE
    markCompleted: '/tasks/', //PATCH
    getAllComplted: '/tasks/completed', //GET
  },
};
