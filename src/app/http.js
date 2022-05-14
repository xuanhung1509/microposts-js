class EasyHTTP {
  // Make an HTTP GET request
  async get(url) {
    try {
      const response = await fetch(url);
      const resData = response.json();
      return resData;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Make an HTTP POST request
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resData = response.json();
      return resData;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Make an HTTP PUT request
  async put(url, data) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resData = response.json();
      return resData;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Make an HTTP DELETE request
  async delete(url) {
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resData = 'Item deleted!';
      return resData;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const http = new EasyHTTP();
