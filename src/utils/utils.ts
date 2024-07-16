const isSuccessfulStatus = (status: number): boolean => {
  return status >= 200 && status < 300;
}