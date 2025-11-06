import api from "@/shared/api/axios";
import type { AppointmentStats } from "../model/types";

export async function GetAppointmentStats(): Promise<AppointmentStats> {
  const response = await api.get<AppointmentStats>("/stats/appointments");
  return response.data;
}
