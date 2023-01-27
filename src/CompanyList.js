import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import { Stack, LinearProgress } from "@mui/material";


/**
 * Return a list of CompanyCard components. Can return all or some.
 * 
 * State: Companies
 * 
 * RouteList -> CompanyList -> {CompanyCard, SearchForm}
 * 
 */
function CompanyList() {

    const [companies, setCompanies] = useState({
        data: null,
        isLoading: true,
    });

    useEffect(function getCompanies() {
        filter();
    }, []);

    async function filter(nameLike) {
        const response = await JoblyApi.getCompanies(nameLike);
        setCompanies({
            data: response,
            isLoading: false,
        });

    }

    if (companies.isLoading) return <p><LinearProgress /></p>;

    return (
        <Stack spacing={2} mt={2}>
            <SearchForm filter={filter} />
            {companies.data.map(company => (
                <CompanyCard key={company.handle} company={company} />
            ))}
        </Stack>


    );
}


export default CompanyList;