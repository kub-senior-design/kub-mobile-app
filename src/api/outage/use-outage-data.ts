import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { z } from "zod";

import { failure, Result, success } from "@/types/result";
import { BASE_URL } from "@/utils/constants/api";

const ElectricOutageSchema = z.object({
  id: z.string(),
  customerCount: z.string(),
  x: z.string(),
  y: z.string(),
  reportedDateTime: z.string(),
  estimatedRestoreTime: z.string().nullable(),
  estimatedRepairTime: z.string().nullable(),
  ertRangeWidth: z.number(),
  relatedEventId: z.string().nullable(),
  ertScenario: z.number(),
  statusMessage: z.string(),
  outageMapMessage: z.string(),
  ertProvided: z.boolean(),
});

const ElectricOutageInfoSchema = z.object({
  id: z.string(),
  lastUpdated: z.string(),
  totalElectricCustomers: z.number(),
  electricCustomersWithoutPower: z.number(),
});

const ElectricOutageDetailSchema = z.object({
  id: z.string(),
  customerCount: z.string(),
  county: z.string(),
  zipcode: z.string(),
});

const ElectricOutageHistorySchema = z.object({
  id: z.string(),
  date: z.string(),
  maxCustomerCount: z.number(),
});

const StormModeSchema = z.enum([
  "normal",
  "minor",
  "major",
  "catastrophic",
  "off",
]);

const getOutageDataResponseValidator = z.object({
  electricOutages: z.array(ElectricOutageSchema),
  electricOutageInfo: ElectricOutageInfoSchema,
  stormMode: StormModeSchema,
  electricOutageDetails: z.array(ElectricOutageDetailSchema),
  electricOutageHistories: z.array(ElectricOutageHistorySchema),
});

type GetOutageDataResponse = z.infer<typeof getOutageDataResponseValidator>;

async function getOutageData(
  axios: AxiosInstance,
): Promise<Result<GetOutageDataResponse>> {
  try {
    const cachedOutageDataUrl = `${BASE_URL}/outage-data/data.json`;

    const response = await axios.get(cachedOutageDataUrl);

    const outageDataResponse = getOutageDataResponseValidator.parse(
      response.data,
    );

    return success(outageDataResponse);
  } catch (error) {
    console.error("Error in getOutageData", error);
    return failure(error);
  }
}

export default function useOutageData(
  axios: AxiosInstance,
): UseQueryResult<Result<GetOutageDataResponse>> {
  return useQuery({
    queryKey: ["outageData", axios],
    queryFn: () => getOutageData(axios),
  });
}
