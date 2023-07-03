import ErrorResponse from "./ErrorResponse";

interface ApiErrorResponse {
  errors: ErrorResponse[],
  statusCode: number
}
export default ApiErrorResponse