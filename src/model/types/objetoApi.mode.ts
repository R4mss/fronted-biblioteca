export type objetoApi = {
    url:string, 
    headers? : headers   
    data?:object
    signal?:AbortSignal,
    autorizacion?:boolean
    method?:string
}
export type headers = {
    accept?: string,
    "Content-Type"?: string,
    Authorization?: string
}