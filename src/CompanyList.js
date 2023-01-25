import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";

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
        nameLike: null
    });
    console.log("companies, ", companies);

    useEffect(function getCompanies() {
        async function getCompaniesReally() {
            const response = await JoblyApi.getCompanies(companies.nameLike);
            setCompanies({
                data: response,
                isLoading: false,
                nameLike: null
            });
        }
        if (companies.isLoading) { 
            getCompaniesReally(); 
        }
    }, [companies]);

    function filter(nameLike) {
        setCompanies({
            data: null,
            isLoading: true,
            nameLike
        });
    }

    if (companies.isLoading) return <p>Loading...</p>;
    return (
        <>
            <h2>Company List</h2>
            <SearchForm filter={filter} />
            {companies.data.map(company => (
                <CompanyCard key={company.handle} company={company} />
            ))}
        </>


    );
}


export default CompanyList;