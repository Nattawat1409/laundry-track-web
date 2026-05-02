export function describeAxiosError(err, fallback = 'Request failed') {
  if (!err) return fallback;
  if (err.response) {
    const { status, data } = err.response;
    if (data?.message) return data.message;
    if (status === 0) return 'Cannot reach server';
    return `Server returned HTTP ${status}`;
  }
  if (err.request) {
    return 'Cannot reach server. Is the backend running on http://localhost:3000?';
  }
  return err.message || fallback;
}
