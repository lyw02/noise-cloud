"use client";

import { get, post } from "aws-amplify/api";
import { OpenDataRecord } from "./types";

export async function getOpenDataFromDb(monitor: string, start: string, end: string) {
  try {
    const restOperation = get({
      apiName: "NoiseAppAPI",
      path: `/openData/${monitor}?start=${start}&end=${end}`,
    });
    const response = await restOperation.response;
    console.log("GET call succeeded: ", response);
    return response;
  } catch (e: any) {
    console.log("GET call failed: ", e);
  }
}

export const getData = async (userId: string) => {
  try {
    const restOperation = get({
      apiName: "NoiseAppAPI",
      path: `/data/${userId}`,
    });
    const response = await restOperation.response;
    console.log("GET call succeeded: ", response);
    return response;
  } catch (e: any) {
    console.log("GET call failed: ", e);
  }
};
