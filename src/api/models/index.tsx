import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import {
    ICreateModelMetadataRequest,
    IModelFindResponse,
    IModelMetadataFindResponse,
    IModelYAMLFindRequest,
    IModelYAMLFindResponse,
} from '../../interfaces/pages/models';

export const getModels = async () => {
    const response = await axiosInstance.get(`${baseURL}/api/v1/models`);

    return response.data as IModelFindResponse[];
};

export const getModelMetadataById = async (id: string | number) => {
    const response = await axiosInstance.get(`${baseURL}/api/v1/models/${id}`);

    return response.data as IModelMetadataFindResponse[];
};

export const getModelYaml = async ({
    modelId,
    version,
}: IModelYAMLFindRequest) => {
    const response = await axiosInstance.get(
        `${baseURL}/api/v1/models/${modelId}/versions/${version}/yaml`
    );

    return response.data as IModelYAMLFindResponse;
};

export const createModelMetadata = async (
    payload: ICreateModelMetadataRequest
) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([name, value]) => {
        formData.append(name, value);
    });

    const response = await axiosInstance.put(
        `${baseURL}/api/v1/models`,
        formData
    );

    return response.data as IModelMetadataFindResponse[];
};

export default getModels;
