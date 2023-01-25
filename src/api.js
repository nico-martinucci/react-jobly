import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // Remember, the backend needs to be authorized with a token
    // We're providing a token you can use to interact with the backend API
    // DON'T MODIFY THIS TOKEN
    static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
        "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
        "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

    /**
     * request: builds an API request from the provided data.
     * 
     * @param {string} endpoint - restful endpoint to make request to
     * @param {object} data - (opt) data to pass in request, either in body or 
     * params (defaults to {})
     * @param {string} method - (opt) type of request (defaults to "get")
     * @returns data retrieved from request; error if something went wrong.
     */
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /**
     * Get details on a company by handle.
     * 
     * @param {string} handle - handle of the company to retrieve
     * @returns object representing a single company
     */
    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);

        return res.company;
    }

    /**
     * Get all companies, filtered if param added.
     * 
     * @param {string} nameLike - search term to filter companies by
     * @returns array of company objects
     */
    static async getCompanies(nameLike = "") {
        const data = nameLike ? { nameLike } : {};
        const res = await this.request(`companies`, data);

        return res.companies;
    }

    /**
     * Get jobs, filtered if param added
     * 
     * @param {string} title - search term to filter jobs by
     * @returns array of job objects
     */
    static async getJobs(title = "") {
        const data = title ? { title } : {};
        const res = await this.request(`jobs`, data);

        return res.jobs;
    }
}

export default JoblyApi;