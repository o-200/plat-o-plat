import api from '@/utils/use-api'

export const getServiceTag = async () => {
    const responce = await api.get("/service-tags");
    return responce.data;
};

export const createServiceTag = async (data: {
    title: string;
    priority: number;
    serviceTagId: number;
}) => {
    const response = await api.post("/service-tags", data)
    return response.data;
};