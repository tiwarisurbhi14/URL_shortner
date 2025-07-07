import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (url,slug) =>{
    const {data}= await axiosInstance.post("/api/create",{url,slug})
    return data
}

export const updateShortUrl = async (url,slug)=>{
    const {data}=await axiosInstance.patch("/api/create/update",{url,slug})
    return data.shortUrl;
} 
