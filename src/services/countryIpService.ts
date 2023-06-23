import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { IIps } from "../interfaces/ips.interface";

export class CountryIpService {
  private readonly ipRegex =
    /(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})/g;
  private readonly locationsFilePath = path.join(
    __dirname,
    "..",
    "..",
    "csv",
    "LOCATION.CSV"
  );

  getFormatedIpsFromString(stringIp: string): IIps | null {
    const ip = stringIp.match(this.ipRegex);
    if (!ip) return null;
    const ipInt =
      ip[0].split(".").reduce((ipInt, octet) => {
        return (ipInt << 8) + parseInt(octet, 10);
      }, 0) >>> 0;
    return { ipString: ip[0], ipInt };
  }

  async getCountryByIpInt(ipInt: number): Promise<string> {
    let country = "I don't know where are you";
    const reader = fs
      .createReadStream(this.locationsFilePath)
      .pipe(csv(["from", "to", "abbreviation", "country"]));

    return new Promise((resolve, reject) => {
      reader.on("data", (data) => {
        if (ipInt >= data.from && ipInt <= data.to) {
          country = data.country;
        }
      });
      reader.on("end", () => resolve(country));
      reader.on("error", (error) => reject(error));
    });
  }
}

export const countryIpService = new CountryIpService();
