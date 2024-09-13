import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getContract = createAsyncThunk(
    "contract/getContract",
    async (houseId, { rejectWithValue }) => {
        try {
            const tokenJWT = localStorage.getItem("token");
            if (!tokenJWT) throw new Error("Token not found");

            const url = `${process.env.REACT_APP_BASE_URL}/v2/Bank/GetContractsAndPaymentsByHouseId?HouseID=${houseId}`;
            const response = await axios.get(url, {
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${tokenJWT}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred while fetching contracts.");
        }
    }
);

export const GetPaymentsById = createAsyncThunk(
    "FetchPaymentsById",
    async (id, { rejectWithValue }) => {
        try {
            const tokenJWT = localStorage.getItem("token");
            const url = `v2/Bank/GetPaymentsById?paymentID=${id}`;

            const response = await axios.get(url, {
                headers: {
                    accept: "text/plain",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenJWT}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred while fetching payment details.");
        }
    }
);

export const GetHistoryPaymentInvoices = createAsyncThunk(
    "FetchPaymentsById",
    async (id, { rejectWithValue }) => {
        try {
            const tokenJWT = localStorage.getItem("token");
            const url = `v2/Bank/GetHistoryPaymentInvoices?PaymentID=${id}`;

            const response = await axios.get(url, {
                headers: {
                    accept: "text/plain",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenJWT}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred while fetching payment details.");
        }
    }
);

export const GetContractsAndPaymentsByHousePort = createAsyncThunk(
    "FetchcontractsRoom",
    async (data, { rejectWithValue }) => {
        try {
            const tokenJWT = localStorage.getItem("token");
            const url = `v2/Bank/create-Paymnet-House-First?ContractID=${data}`;

            const response = await axios.post(url, null, {
                headers: {
                    accept: "text/plain",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenJWT}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred while creating payment.");
        }
    }
);
export const UpdatePayment = createAsyncThunk(
    "FetchcontractsRoom",
    async ({ PaymentId, data }, { rejectWithValue }) => {
        try {
            const tokenJWT = localStorage.getItem("token");
            const url = `v2/Bank/UpdatePayment/${PaymentId}`;

            const response = await axios.post(url, data, {
                headers: {
                    accept: "text/plain",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenJWT}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred while fetching payment details.");
        }
    }
);


export const GetContractsAndPaymentsByHouseId = createAsyncThunk(
    "FetchcontractsRoom",
    async (data, { rejectWithValue }) => {
        try {
            const tokenJWT = localStorage.getItem("token");
            const url = `v2/Bank/GetContractsAndPaymentsByHouseId?HouseID=${data}`;

            const response = await axios.get(url, {
                headers: {
                    accept: "text/plain",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenJWT}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred while fetching contracts and payments.");
        }
    }
);


export const createPaymentForContract = createAsyncThunk(
    "contract/createPaymentForContract",
    async (data, { rejectWithValue }) => {
        try {
            const tokenJWT = localStorage.getItem("token");
            const url = `${process.env.REACT_APP_BASE_URL}/v2/Bank/create-Paymnet-For-Contract`;



            const response = await axios.post(url, data, {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenJWT}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred while creating payment.");
        }
    }
);


export const ContractsSlice = createSlice({
    name: "contracts",
    initialState: {
        isLoading: false,
        contracts: [],
        error: null,
    },
    reducers: {
        addNewLead: (state, action) => {
            state.contracts = [...state.contracts, action.payload.newObj];
        },
        updateContract: (state, action) => {
            const index = state.contracts.findIndex((contract) => contract.id === action.payload.newObj.id);
            if (index !== -1) {
                state.contracts = [
                    ...state.contracts.slice(0, index),
                    action.payload.newObj,
                    ...state.contracts.slice(index + 1),
                ];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContract.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getContract.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contracts = action.payload;
            })
            .addCase(getContract.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default ContractsSlice.reducer;
