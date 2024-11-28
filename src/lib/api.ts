"use client";

import { get, post } from "aws-amplify/api";
import { DataRecord, OpenDataRecord } from "./types";

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

export const getAllUserData = async () => {
  try {
    const restOperation = get({
      apiName: "NoiseAppAPI",
      path: `/data`,
    });
    const response = await restOperation.response;
    console.log("GET call succeeded: ", response);
    return response;
  } catch (e: any) {
    console.log("GET call failed: ", e);
  }
};

export const uploadData = async (data: DataRecord) => {
  console.log(`Data:: ${JSON.stringify(data)}`);
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key as keyof DataRecord].toString());
  });
  console.log(`Data:: ${JSON.stringify(formData)}`);
  try {
    const restOperation = post({
      apiName: "NoiseAppAPI",
      path: "/data",
      options: {
        body: formData,
      },
    });
    const response = await restOperation.response;
    console.log("POST call succeeded: ", response);
  } catch (e: any) {
    console.log("POST call failed: ", e);
  }
};
