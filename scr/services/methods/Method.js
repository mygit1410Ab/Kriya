import instance from '../instance/Instance';

export const method = {
  get: async endpoint => {
    try {
      const res = await instance.get(endpoint);
      console.log('res=======>', res.data);
      return res.data;
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  },
  post: async (endpoint, data) => {
    try {
      console.log('Posting to endpoint ===>', endpoint);
      console.log('Data being posted ===>', data);

      const res = await instance.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('Response Data:', res.data);
      return res.data;
    } catch (error) {
      console.error('POST request error:', error.message);
      throw error;
    }
  },
  put: async (endpoint, data) => {
    try {
      console.log('Data we are pusting ===>', data);
      console.log('endpoint on we are pusting ===>', endpoint);
      const res = await instance.put(endpoint, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  },
  delete: async endpoint => {
    try {
      console.log('Data we are deleting ===>', endpoint);
      const res = await instance.delete(endpoint);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  },
  patch: async (endpoint, data) => {
    try {
      console.log('Data we are posting ===>', data);
      console.log('endpoint on we are pusting ===>', endpoint);
      const res = await instance.patch(endpoint, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  },
};
