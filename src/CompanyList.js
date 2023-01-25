import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import { Stack } from "@mui/material";

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

    //TODO: move async intothis and then pass this through
    async function filter(nameLike) {
        const response = await JoblyApi.getCompanies(nameLike);
        setCompanies({
            data: response,
            isLoading: false,
        });

    }

    //TODO: add a component for loading spinner
    if (companies.isLoading) return <p>Loading...</p>;
    return (
        <Stack spacing={2}>
            <h2>Company List</h2>
            <SearchForm filter={filter} />
            {companies.data.map(company => (
                <CompanyCard key={company.handle} company={company} />
            ))}
        </Stack>


    );
}


export default CompanyList;