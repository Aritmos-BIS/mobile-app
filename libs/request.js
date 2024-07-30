export const apiFetch = async ({ payload, method }, url) => {
  const URL = process.env.EXPO_PUBLIC_API_URL + url;
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (payload) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(URL, options);
    return response.json();
  } catch (err) {
    console.error(err);
  }
};
