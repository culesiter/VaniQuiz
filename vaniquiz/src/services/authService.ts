 
import { apiRoutes, apiUrl } from "@/configs/apiRouters";
import axiosClient from "@/lib/axiosClient";
const signIn = async (email: string, password: string): Promise<any> => {
   try {
		return await axiosClient.post(apiUrl + apiRoutes.login, { email, password }, {});
	} catch (error) {
        console.log(error);
        
		return {};
	}
    
};

const registerAccount = async (name: string, email: string, password: string): Promise<any> => {
	try {
		 return await axiosClient.post(apiUrl + apiRoutes.register, {name, email, password }, {});
	 } catch (error) {
		 console.log(error);
		 
		 return {};
	 }
	 
 };
 

export { signIn, registerAccount};