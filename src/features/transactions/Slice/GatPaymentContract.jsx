import axios from 'axios';


const GetPaymentsById = async (id) => {
    try {
        const response = await axios.get(`v2/Bank/GetPaymentsById`, {
            params: {
                id: id
            }
        });
        console.log("🚀 ~ fetchHistoryDeposit ~ response:", response.data);
        return response.data.history;
    } catch (error) {
        console.error('Error fetching history deposit:', error);
        throw error;
    }
};


export default { GetPaymentsById };