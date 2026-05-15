import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tickets";

export const createTicket = (ticket) => axios.post(BASE_URL, ticket);

export const getAllTickets = () => axios.get(BASE_URL);

export const getTicketsByEmail = (email) => axios.get(`${BASE_URL}/email/${email}`);

export const updateTicketStatus = (id, status) =>
  axios.put(`${BASE_URL}/${id}/status`, { status });