import { Link } from "react-router-dom";

/**
 * Renders a single card with details passed down from CompanyList
 * 
 * props: company - an object with details about a single company
 * 
 * CompanyList -> CompanyCard
 */
function CompanyCard({ company }) {

    return (
        <Link to={`/companies/${company.handle}`} >
            <div>
                <p>{company.name}</p>
                <p>{company.description}</p>
            </div>
            <img src={company.logoUrl} alt={`logo for ${company.name}`} />
        </Link >
    );
}


export default CompanyCard;