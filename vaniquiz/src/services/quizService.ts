 
import { apiRoutes, apiUrl } from "@/configs/apiRouters";
import axiosClient from "@/lib/axiosClient";
const getQuizs = async (): Promise<any> => {
	console.log(123);
	
   try {
		return await axiosClient.get(apiUrl + apiRoutes.quizs);
	} catch (error) {
        console.log(error);
        
		return {};
	}
    
};


 

export { getQuizs };