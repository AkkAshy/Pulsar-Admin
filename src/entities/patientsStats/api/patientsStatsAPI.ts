import api from "@/shared/api/axios";
import type { PatientsStats } from "../model/types";

export async function GetPatientsStats(): Promise<PatientsStats> {
  const response = await api.get<PatientsStats>("/stats/patients");
  return response.data;
}
