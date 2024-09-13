import axios from 'axios';

const fetchHistoryDeposit = async (depositID) => {
    try {
        const response = await axios.get(`v2/Bank/GetHistoryPaymentDeposit`, {
            params: {
                DepositID: depositID
            }
        });
        console.log("🚀 ~ fetchHistoryDeposit ~ response:", response.data);
        return response.data.history;
    } catch (error) {
        console.error('Error fetching history deposit:', error);
        throw error;
    }
};

export default fetchHistoryDeposit;