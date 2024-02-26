import axios from "axios";
import { objetoApi } from "@/model/types/objetoApi.mode";
//import { respuesta } from "../enum/respuesta.mode";

const useApi = () => {
  const customFetch = async (params: objetoApi) => {
    var token: string = "";

    if (localStorage.getItem("token"))
      token = localStorage.getItem("token") as string;

    const defaultHeader: objetoApi["headers"] = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (!params.autorizacion) delete defaultHeader.Authorization;

    const controller = new AbortController();
    params.signal = controller.signal;

    params = { ...params, method: params.method || "GET" };

    params.headers = params.headers
      ? { ...defaultHeader, ...params.headers }
      : defaultHeader;
   
    params.url = import.meta.env.VITE_URL_API + params.url;

    delete params.autorizacion;

    if (params.data == undefined) delete params.data;

    setTimeout(() => controller.abort(), 60000);
    return await axios(params)
      .then(
        (res) =>
          res?.data || "Sucedio algun por favor, vuelva a intentarlo mas tarde"
      )
      .catch((err) => ({
        codigo: err.response?.data.codigo || 500,
        mensaje:
          err.response?.data.mensaje ||
          "Sucedio algun por favor, vuelva a intentarlo mas tarde",
      }));
  };

  const get = (datos: objetoApi) => customFetch(datos);

  const post = (datos: objetoApi) => {
    datos.method = "POST";
    return customFetch(datos);
  };

  const put = (datos: objetoApi) => {
    datos.method = "PUT";
    return customFetch(datos);
  };

  const del = (datos: objetoApi) => {
    datos.method = "DELETE";
    return customFetch(datos);
  };
  return {
    get,
    post,
    put,
    del,
  };
};
export default useApi;
