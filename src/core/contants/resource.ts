import { RouteConfig } from "@core/interfaces";
import messageEn from "@utils/localization/en.json";

export interface RouteResource extends RouteConfig {
  module: string;
}

interface Resource {
  initiated: boolean;
  routes: RouteResource[];
  message: { [key: string]: any };
  authenticated: boolean;
}

export const defaultResource: Resource = {
  initiated: false,
  routes: [],
  message: {
    en: messageEn,
  },
  authenticated: false,
};
